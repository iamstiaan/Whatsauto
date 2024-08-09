import { ZodSchema } from 'zod';
import { Options, Targets } from './Options';
import { JsonSchema7Type, parseDef } from './parseDef';
import { getRefs } from './Refs';
import { zodDef, isEmptyObj } from './util';

const zodToJsonSchema = <Target extends Targets = 'jsonSchema7'>(
  schema: ZodSchema<any>,
  options?: Partial<Options<Target>> | string,
): (Target extends 'jsonSchema7' ? JsonSchema7Type : object) & {
  $schema?: string;
  definitions?: {
    [key: string]: Target extends 'jsonSchema7' ? JsonSchema7Type
    : Target extends 'jsonSchema2019-09' ? JsonSchema7Type
    : object;
  };
} => {
  const refs = getRefs(options);

  const name =
    typeof options === 'string' ? options
    : options?.nameStrategy === 'title' ? undefined
    : options?.name;

  const main =
    parseDef(
      schema._def,
      name === undefined ? refs : (
        {
          ...refs,
          currentPath: [...refs.basePath, refs.definitionPath, name],
        }
      ),
      false,
    ) ?? {};

  const title =
    typeof options === 'object' && options.name !== undefined && options.nameStrategy === 'title' ?
      options.name
    : undefined;

  if (title !== undefined) {
    main.title = title;
  }

  const definitions = (() => {
    if (isEmptyObj(refs.definitions)) {
      return undefined;
    }

    const definitions: Record<string, any> = {};

    for (const [name, zodSchema] of Object.entries(refs.definitions)) {
      definitions[name] =
        parseDef(
          zodDef(zodSchema),
          { ...refs, currentPath: [...refs.basePath, refs.definitionPath, name] },
          true,
        ) ?? {};
    }

    return definitions;
  })();

  const combined: ReturnType<typeof zodToJsonSchema<Target>> =
    name === undefined ?
      definitions ?
        {
          ...main,
          [refs.definitionPath]: definitions,
        }
      : main
    : refs.nameStrategy === 'duplicate-ref' ?
      {
        ...main,
        ...(definitions || refs.seenRefs.size ?
          {
            [refs.definitionPath]: {
              ...definitions,
              // only actually duplicate the schema definition if it was ever referenced
              // otherwise the duplication is completely pointless
              ...(refs.seenRefs.size ? { [name]: main } : undefined),
            },
          }
        : undefined),
      }
    : {
        $ref: [...(refs.$refStrategy === 'relative' ? [] : refs.basePath), refs.definitionPath, name].join(
          '/',
        ),
        [refs.definitionPath]: {
          ...definitions,
          [name]: main,
        },
      };

  if (refs.target === 'jsonSchema7') {
    combined.$schema = 'http://json-schema.org/draft-07/schema#';
  } else if (refs.target === 'jsonSchema2019-09') {
    combined.$schema = 'https://json-schema.org/draft/2019-09/schema#';
  }

  return combined;
};

export { zodToJsonSchema };
