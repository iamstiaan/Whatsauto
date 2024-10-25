// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import { isRequestOptions } from '../../../core';
import { APIPromise } from '../../../core';
import * as Core from '../../../core';
import * as ThreadsAPI from './threads';
import * as Shared from '../../shared';
import * as AssistantsAPI from '../assistants';
import * as ChatAPI from '../../chat/chat';
import * as MessagesAPI from './messages';
import * as VectorStoresAPI from '../vector-stores/vector-stores';
import * as RunsAPI from './runs/runs';
import { Stream } from '../../../streaming';

export class Threads extends APIResource {
  runs: RunsAPI.Runs = new RunsAPI.Runs(this._client);
  messages: MessagesAPI.Messages = new MessagesAPI.Messages(this._client);

  /**
   * Create a thread.
   */
  create(body?: ThreadCreateParams, options?: Core.RequestOptions): Core.APIPromise<Thread>;
  create(options?: Core.RequestOptions): Core.APIPromise<Thread>;
  create(
    body: ThreadCreateParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<Thread> {
    if (isRequestOptions(body)) {
      return this.create({}, body);
    }
    return this._client.post('/threads', {
      body,
      ...options,
      headers: { 'OpenAI-Beta': 'assistants=v2', ...options?.headers },
    });
  }

  /**
   * Retrieves a thread.
   */
  retrieve(threadId: string, options?: Core.RequestOptions): Core.APIPromise<Thread> {
    return this._client.get(`/threads/${threadId}`, {
      ...options,
      headers: { 'OpenAI-Beta': 'assistants=v2', ...options?.headers },
    });
  }

  /**
   * Modifies a thread.
   */
  update(threadId: string, body: ThreadUpdateParams, options?: Core.RequestOptions): Core.APIPromise<Thread> {
    return this._client.post(`/threads/${threadId}`, {
      body,
      ...options,
      headers: { 'OpenAI-Beta': 'assistants=v2', ...options?.headers },
    });
  }

  /**
   * Delete a thread.
   */
  del(threadId: string, options?: Core.RequestOptions): Core.APIPromise<ThreadDeleted> {
    return this._client.delete(`/threads/${threadId}`, {
      ...options,
      headers: { 'OpenAI-Beta': 'assistants=v2', ...options?.headers },
    });
  }

  /**
   * Create a thread and run it in one request.
   */
  createAndRun(
    body: ThreadCreateAndRunParamsNonStreaming,
    options?: Core.RequestOptions,
  ): APIPromise<RunsAPI.Run>;
  createAndRun(
    body: ThreadCreateAndRunParamsStreaming,
    options?: Core.RequestOptions,
  ): APIPromise<Stream<AssistantsAPI.AssistantStreamEvent>>;
  createAndRun(
    body: ThreadCreateAndRunParamsBase,
    options?: Core.RequestOptions,
  ): APIPromise<Stream<AssistantsAPI.AssistantStreamEvent> | RunsAPI.Run>;
  createAndRun(
    body: ThreadCreateAndRunParams,
    options?: Core.RequestOptions,
  ): APIPromise<RunsAPI.Run> | APIPromise<Stream<AssistantsAPI.AssistantStreamEvent>> {
    return this._client.post('/threads/runs', {
      body,
      ...options,
      headers: { 'OpenAI-Beta': 'assistants=v2', ...options?.headers },
      stream: body.stream ?? false,
    }) as APIPromise<RunsAPI.Run> | APIPromise<Stream<AssistantsAPI.AssistantStreamEvent>>;
  }
}

/**
 * Specifies the format that the model must output. Compatible with
 * [GPT-4o](https://platform.openai.com/docs/models/gpt-4o),
 * [GPT-4 Turbo](https://platform.openai.com/docs/models/gpt-4-turbo-and-gpt-4),
 * and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.
 *
 * Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured
 * Outputs which ensures the model will match your supplied JSON schema. Learn more
 * in the
 * [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).
 *
 * Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the
 * message the model generates is valid JSON.
 *
 * **Important:** when using JSON mode, you **must** also instruct the model to
 * produce JSON yourself via a system or user message. Without this, the model may
 * generate an unending stream of whitespace until the generation reaches the token
 * limit, resulting in a long-running and seemingly "stuck" request. Also note that
 * the message content may be partially cut off if `finish_reason="length"`, which
 * indicates the generation exceeded `max_tokens` or the conversation exceeded the
 * max context length.
 */
export type AssistantResponseFormatOption =
  | 'auto'
  | Shared.ResponseFormatText
  | Shared.ResponseFormatJSONObject
  | Shared.ResponseFormatJSONSchema;

/**
 * Specifies a tool the model should use. Use to force the model to call a specific
 * tool.
 */
export interface AssistantToolChoice {
  /**
   * The type of the tool. If type is `function`, the function name must be set
   */
  type: 'function' | 'code_interpreter' | 'file_search';

  function?: AssistantToolChoiceFunction;
}

export interface AssistantToolChoiceFunction {
  /**
   * The name of the function to call.
   */
  name: string;
}

/**
 * Controls which (if any) tool is called by the model. `none` means the model will
 * not call any tools and instead generates a message. `auto` is the default value
 * and means the model can pick between generating a message or calling one or more
 * tools. `required` means the model must call one or more tools before responding
 * to the user. Specifying a particular tool like `{"type": "file_search"}` or
 * `{"type": "function", "function": {"name": "my_function"}}` forces the model to
 * call that tool.
 */
export type AssistantToolChoiceOption = 'none' | 'auto' | 'required' | AssistantToolChoice;

/**
 * Represents a thread that contains
 * [messages](https://platform.openai.com/docs/api-reference/messages).
 */
export interface Thread {
  /**
   * The identifier, which can be referenced in API endpoints.
   */
  id: string;

  /**
   * The Unix timestamp (in seconds) for when the thread was created.
   */
  created_at: number;

  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be useful
   * for storing additional information about the object in a structured format. Keys
   * can be a maximum of 64 characters long and values can be a maximum of 512
   * characters long.
   */
  metadata: unknown | null;

  /**
   * The object type, which is always `thread`.
   */
  object: 'thread';

  /**
   * A set of resources that are made available to the assistant's tools in this
   * thread. The resources are specific to the type of tool. For example, the
   * `code_interpreter` tool requires a list of file IDs, while the `file_search`
   * tool requires a list of vector store IDs.
   */
  tool_resources: Thread.ToolResources | null;
}

export namespace Thread {
  /**
   * A set of resources that are made available to the assistant's tools in this
   * thread. The resources are specific to the type of tool. For example, the
   * `code_interpreter` tool requires a list of file IDs, while the `file_search`
   * tool requires a list of vector store IDs.
   */
  export interface ToolResources {
    code_interpreter?: ToolResources.CodeInterpreter;

    file_search?: ToolResources.FileSearch;
  }

  export namespace ToolResources {
    export interface CodeInterpreter {
      /**
       * A list of [file](https://platform.openai.com/docs/api-reference/files) IDs made
       * available to the `code_interpreter` tool. There can be a maximum of 20 files
       * associated with the tool.
       */
      file_ids?: Array<string>;
    }

    export interface FileSearch {
      /**
       * The
       * [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object)
       * attached to this thread. There can be a maximum of 1 vector store attached to
       * the thread.
       */
      vector_store_ids?: Array<string>;
    }
  }
}

export interface ThreadDeleted {
  id: string;

  deleted: boolean;

  object: 'thread.deleted';
}

export interface ThreadCreateParams {
  /**
   * A list of [messages](https://platform.openai.com/docs/api-reference/messages) to
   * start the thread with.
   */
  messages?: Array<ThreadCreateParams.Message>;

  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be useful
   * for storing additional information about the object in a structured format. Keys
   * can be a maximum of 64 characters long and values can be a maximum of 512
   * characters long.
   */
  metadata?: unknown | null;

  /**
   * A set of resources that are made available to the assistant's tools in this
   * thread. The resources are specific to the type of tool. For example, the
   * `code_interpreter` tool requires a list of file IDs, while the `file_search`
   * tool requires a list of vector store IDs.
   */
  tool_resources?: ThreadCreateParams.ToolResources | null;
}

export namespace ThreadCreateParams {
  export interface Message {
    /**
     * The text contents of the message.
     */
    content: string | Array<MessagesAPI.MessageContentPartParam>;

    /**
     * The role of the entity that is creating the message. Allowed values include:
     *
     * - `user`: Indicates the message is sent by an actual user and should be used in
     *   most cases to represent user-generated messages.
     * - `assistant`: Indicates the message is generated by the assistant. Use this
     *   value to insert messages from the assistant into the conversation.
     */
    role: 'user' | 'assistant';

    /**
     * A list of files attached to the message, and the tools they should be added to.
     */
    attachments?: Array<Message.Attachment> | null;

    /**
     * Set of 16 key-value pairs that can be attached to an object. This can be useful
     * for storing additional information about the object in a structured format. Keys
     * can be a maximum of 64 characters long and values can be a maximum of 512
     * characters long.
     */
    metadata?: unknown | null;
  }

  export namespace Message {
    export interface Attachment {
      /**
       * The ID of the file to attach to the message.
       */
      file_id?: string;

      /**
       * The tools to add this file to.
       */
      tools?: Array<AssistantsAPI.CodeInterpreterTool | Attachment.FileSearch>;
    }

    export namespace Attachment {
      export interface FileSearch {
        /**
         * The type of tool being defined: `file_search`
         */
        type: 'file_search';
      }
    }
  }

  /**
   * A set of resources that are made available to the assistant's tools in this
   * thread. The resources are specific to the type of tool. For example, the
   * `code_interpreter` tool requires a list of file IDs, while the `file_search`
   * tool requires a list of vector store IDs.
   */
  export interface ToolResources {
    code_interpreter?: ToolResources.CodeInterpreter;

    file_search?: ToolResources.FileSearch;
  }

  export namespace ToolResources {
    export interface CodeInterpreter {
      /**
       * A list of [file](https://platform.openai.com/docs/api-reference/files) IDs made
       * available to the `code_interpreter` tool. There can be a maximum of 20 files
       * associated with the tool.
       */
      file_ids?: Array<string>;
    }

    export interface FileSearch {
      /**
       * The
       * [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object)
       * attached to this thread. There can be a maximum of 1 vector store attached to
       * the thread.
       */
      vector_store_ids?: Array<string>;

      /**
       * A helper to create a
       * [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object)
       * with file_ids and attach it to this thread. There can be a maximum of 1 vector
       * store attached to the thread.
       */
      vector_stores?: Array<FileSearch.VectorStore>;
    }

    export namespace FileSearch {
      export interface VectorStore {
        /**
         * The chunking strategy used to chunk the file(s). If not set, will use the `auto`
         * strategy. Only applicable if `file_ids` is non-empty.
         */
        chunking_strategy?: VectorStoresAPI.FileChunkingStrategyParam;

        /**
         * A list of [file](https://platform.openai.com/docs/api-reference/files) IDs to
         * add to the vector store. There can be a maximum of 10000 files in a vector
         * store.
         */
        file_ids?: Array<string>;

        /**
         * Set of 16 key-value pairs that can be attached to a vector store. This can be
         * useful for storing additional information about the vector store in a structured
         * format. Keys can be a maximum of 64 characters long and values can be a maximum
         * of 512 characters long.
         */
        metadata?: unknown;
      }
    }
  }
}

export interface ThreadUpdateParams {
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be useful
   * for storing additional information about the object in a structured format. Keys
   * can be a maximum of 64 characters long and values can be a maximum of 512
   * characters long.
   */
  metadata?: unknown | null;

  /**
   * A set of resources that are made available to the assistant's tools in this
   * thread. The resources are specific to the type of tool. For example, the
   * `code_interpreter` tool requires a list of file IDs, while the `file_search`
   * tool requires a list of vector store IDs.
   */
  tool_resources?: ThreadUpdateParams.ToolResources | null;
}

export namespace ThreadUpdateParams {
  /**
   * A set of resources that are made available to the assistant's tools in this
   * thread. The resources are specific to the type of tool. For example, the
   * `code_interpreter` tool requires a list of file IDs, while the `file_search`
   * tool requires a list of vector store IDs.
   */
  export interface ToolResources {
    code_interpreter?: ToolResources.CodeInterpreter;

    file_search?: ToolResources.FileSearch;
  }

  export namespace ToolResources {
    export interface CodeInterpreter {
      /**
       * A list of [file](https://platform.openai.com/docs/api-reference/files) IDs made
       * available to the `code_interpreter` tool. There can be a maximum of 20 files
       * associated with the tool.
       */
      file_ids?: Array<string>;
    }

    export interface FileSearch {
      /**
       * The
       * [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object)
       * attached to this thread. There can be a maximum of 1 vector store attached to
       * the thread.
       */
      vector_store_ids?: Array<string>;
    }
  }
}

export type ThreadCreateAndRunParams =
  | ThreadCreateAndRunParamsNonStreaming
  | ThreadCreateAndRunParamsStreaming;

export interface ThreadCreateAndRunParamsBase {
  /**
   * The ID of the
   * [assistant](https://platform.openai.com/docs/api-reference/assistants) to use to
   * execute this run.
   */
  assistant_id: string;

  /**
   * Override the default system message of the assistant. This is useful for
   * modifying the behavior on a per-run basis.
   */
  instructions?: string | null;

  /**
   * The maximum number of completion tokens that may be used over the course of the
   * run. The run will make a best effort to use only the number of completion tokens
   * specified, across multiple turns of the run. If the run exceeds the number of
   * completion tokens specified, the run will end with status `incomplete`. See
   * `incomplete_details` for more info.
   */
  max_completion_tokens?: number | null;

  /**
   * The maximum number of prompt tokens that may be used over the course of the run.
   * The run will make a best effort to use only the number of prompt tokens
   * specified, across multiple turns of the run. If the run exceeds the number of
   * prompt tokens specified, the run will end with status `incomplete`. See
   * `incomplete_details` for more info.
   */
  max_prompt_tokens?: number | null;

  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be useful
   * for storing additional information about the object in a structured format. Keys
   * can be a maximum of 64 characters long and values can be a maximum of 512
   * characters long.
   */
  metadata?: unknown | null;

  /**
   * The ID of the [Model](https://platform.openai.com/docs/api-reference/models) to
   * be used to execute this run. If a value is provided here, it will override the
   * model associated with the assistant. If not, the model associated with the
   * assistant will be used.
   */
  model?: (string & {}) | ChatAPI.ChatModel | null;

  /**
   * Whether to enable
   * [parallel function calling](https://platform.openai.com/docs/guides/function-calling/parallel-function-calling)
   * during tool use.
   */
  parallel_tool_calls?: boolean;

  /**
   * Specifies the format that the model must output. Compatible with
   * [GPT-4o](https://platform.openai.com/docs/models/gpt-4o),
   * [GPT-4 Turbo](https://platform.openai.com/docs/models/gpt-4-turbo-and-gpt-4),
   * and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.
   *
   * Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured
   * Outputs which ensures the model will match your supplied JSON schema. Learn more
   * in the
   * [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).
   *
   * Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the
   * message the model generates is valid JSON.
   *
   * **Important:** when using JSON mode, you **must** also instruct the model to
   * produce JSON yourself via a system or user message. Without this, the model may
   * generate an unending stream of whitespace until the generation reaches the token
   * limit, resulting in a long-running and seemingly "stuck" request. Also note that
   * the message content may be partially cut off if `finish_reason="length"`, which
   * indicates the generation exceeded `max_tokens` or the conversation exceeded the
   * max context length.
   */
  response_format?: AssistantResponseFormatOption | null;

  /**
   * If `true`, returns a stream of events that happen during the Run as server-sent
   * events, terminating when the Run enters a terminal state with a `data: [DONE]`
   * message.
   */
  stream?: boolean | null;

  /**
   * What sampling temperature to use, between 0 and 2. Higher values like 0.8 will
   * make the output more random, while lower values like 0.2 will make it more
   * focused and deterministic.
   */
  temperature?: number | null;

  /**
   * If no thread is provided, an empty thread will be created.
   */
  thread?: ThreadCreateAndRunParams.Thread;

  /**
   * Controls which (if any) tool is called by the model. `none` means the model will
   * not call any tools and instead generates a message. `auto` is the default value
   * and means the model can pick between generating a message or calling one or more
   * tools. `required` means the model must call one or more tools before responding
   * to the user. Specifying a particular tool like `{"type": "file_search"}` or
   * `{"type": "function", "function": {"name": "my_function"}}` forces the model to
   * call that tool.
   */
  tool_choice?: AssistantToolChoiceOption | null;

  /**
   * A set of resources that are used by the assistant's tools. The resources are
   * specific to the type of tool. For example, the `code_interpreter` tool requires
   * a list of file IDs, while the `file_search` tool requires a list of vector store
   * IDs.
   */
  tool_resources?: ThreadCreateAndRunParams.ToolResources | null;

  /**
   * Override the tools the assistant can use for this run. This is useful for
   * modifying the behavior on a per-run basis.
   */
  tools?: Array<
    AssistantsAPI.CodeInterpreterTool | AssistantsAPI.FileSearchTool | AssistantsAPI.FunctionTool
  > | null;

  /**
   * An alternative to sampling with temperature, called nucleus sampling, where the
   * model considers the results of the tokens with top_p probability mass. So 0.1
   * means only the tokens comprising the top 10% probability mass are considered.
   *
   * We generally recommend altering this or temperature but not both.
   */
  top_p?: number | null;

  /**
   * Controls for how a thread will be truncated prior to the run. Use this to
   * control the intial context window of the run.
   */
  truncation_strategy?: ThreadCreateAndRunParams.TruncationStrategy | null;
}

export namespace ThreadCreateAndRunParams {
  /**
   * If no thread is provided, an empty thread will be created.
   */
  export interface Thread {
    /**
     * A list of [messages](https://platform.openai.com/docs/api-reference/messages) to
     * start the thread with.
     */
    messages?: Array<Thread.Message>;

    /**
     * Set of 16 key-value pairs that can be attached to an object. This can be useful
     * for storing additional information about the object in a structured format. Keys
     * can be a maximum of 64 characters long and values can be a maximum of 512
     * characters long.
     */
    metadata?: unknown | null;

    /**
     * A set of resources that are made available to the assistant's tools in this
     * thread. The resources are specific to the type of tool. For example, the
     * `code_interpreter` tool requires a list of file IDs, while the `file_search`
     * tool requires a list of vector store IDs.
     */
    tool_resources?: Thread.ToolResources | null;
  }

  export namespace Thread {
    export interface Message {
      /**
       * The text contents of the message.
       */
      content: string | Array<MessagesAPI.MessageContentPartParam>;

      /**
       * The role of the entity that is creating the message. Allowed values include:
       *
       * - `user`: Indicates the message is sent by an actual user and should be used in
       *   most cases to represent user-generated messages.
       * - `assistant`: Indicates the message is generated by the assistant. Use this
       *   value to insert messages from the assistant into the conversation.
       */
      role: 'user' | 'assistant';

      /**
       * A list of files attached to the message, and the tools they should be added to.
       */
      attachments?: Array<Message.Attachment> | null;

      /**
       * Set of 16 key-value pairs that can be attached to an object. This can be useful
       * for storing additional information about the object in a structured format. Keys
       * can be a maximum of 64 characters long and values can be a maximum of 512
       * characters long.
       */
      metadata?: unknown | null;
    }

    export namespace Message {
      export interface Attachment {
        /**
         * The ID of the file to attach to the message.
         */
        file_id?: string;

        /**
         * The tools to add this file to.
         */
        tools?: Array<AssistantsAPI.CodeInterpreterTool | Attachment.FileSearch>;
      }

      export namespace Attachment {
        export interface FileSearch {
          /**
           * The type of tool being defined: `file_search`
           */
          type: 'file_search';
        }
      }
    }

    /**
     * A set of resources that are made available to the assistant's tools in this
     * thread. The resources are specific to the type of tool. For example, the
     * `code_interpreter` tool requires a list of file IDs, while the `file_search`
     * tool requires a list of vector store IDs.
     */
    export interface ToolResources {
      code_interpreter?: ToolResources.CodeInterpreter;

      file_search?: ToolResources.FileSearch;
    }

    export namespace ToolResources {
      export interface CodeInterpreter {
        /**
         * A list of [file](https://platform.openai.com/docs/api-reference/files) IDs made
         * available to the `code_interpreter` tool. There can be a maximum of 20 files
         * associated with the tool.
         */
        file_ids?: Array<string>;
      }

      export interface FileSearch {
        /**
         * The
         * [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object)
         * attached to this thread. There can be a maximum of 1 vector store attached to
         * the thread.
         */
        vector_store_ids?: Array<string>;

        /**
         * A helper to create a
         * [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object)
         * with file_ids and attach it to this thread. There can be a maximum of 1 vector
         * store attached to the thread.
         */
        vector_stores?: Array<FileSearch.VectorStore>;
      }

      export namespace FileSearch {
        export interface VectorStore {
          /**
           * The chunking strategy used to chunk the file(s). If not set, will use the `auto`
           * strategy. Only applicable if `file_ids` is non-empty.
           */
          chunking_strategy?: VectorStoresAPI.FileChunkingStrategyParam;

          /**
           * A list of [file](https://platform.openai.com/docs/api-reference/files) IDs to
           * add to the vector store. There can be a maximum of 10000 files in a vector
           * store.
           */
          file_ids?: Array<string>;

          /**
           * Set of 16 key-value pairs that can be attached to a vector store. This can be
           * useful for storing additional information about the vector store in a structured
           * format. Keys can be a maximum of 64 characters long and values can be a maximum
           * of 512 characters long.
           */
          metadata?: unknown;
        }
      }
    }
  }

  /**
   * A set of resources that are used by the assistant's tools. The resources are
   * specific to the type of tool. For example, the `code_interpreter` tool requires
   * a list of file IDs, while the `file_search` tool requires a list of vector store
   * IDs.
   */
  export interface ToolResources {
    code_interpreter?: ToolResources.CodeInterpreter;

    file_search?: ToolResources.FileSearch;
  }

  export namespace ToolResources {
    export interface CodeInterpreter {
      /**
       * A list of [file](https://platform.openai.com/docs/api-reference/files) IDs made
       * available to the `code_interpreter` tool. There can be a maximum of 20 files
       * associated with the tool.
       */
      file_ids?: Array<string>;
    }

    export interface FileSearch {
      /**
       * The ID of the
       * [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object)
       * attached to this assistant. There can be a maximum of 1 vector store attached to
       * the assistant.
       */
      vector_store_ids?: Array<string>;
    }
  }

  /**
   * Controls for how a thread will be truncated prior to the run. Use this to
   * control the intial context window of the run.
   */
  export interface TruncationStrategy {
    /**
     * The truncation strategy to use for the thread. The default is `auto`. If set to
     * `last_messages`, the thread will be truncated to the n most recent messages in
     * the thread. When set to `auto`, messages in the middle of the thread will be
     * dropped to fit the context length of the model, `max_prompt_tokens`.
     */
    type: 'auto' | 'last_messages';

    /**
     * The number of most recent messages from the thread when constructing the context
     * for the run.
     */
    last_messages?: number | null;
  }

  export type ThreadCreateAndRunParamsNonStreaming = ThreadsAPI.ThreadCreateAndRunParamsNonStreaming;
  export type ThreadCreateAndRunParamsStreaming = ThreadsAPI.ThreadCreateAndRunParamsStreaming;
}

export interface ThreadCreateAndRunParamsNonStreaming extends ThreadCreateAndRunParamsBase {
  /**
   * If `true`, returns a stream of events that happen during the Run as server-sent
   * events, terminating when the Run enters a terminal state with a `data: [DONE]`
   * message.
   */
  stream?: false | null;
}

export interface ThreadCreateAndRunParamsStreaming extends ThreadCreateAndRunParamsBase {
  /**
   * If `true`, returns a stream of events that happen during the Run as server-sent
   * events, terminating when the Run enters a terminal state with a `data: [DONE]`
   * message.
   */
  stream: true;
}

export namespace Threads {
  export type AssistantResponseFormatOption = ThreadsAPI.AssistantResponseFormatOption;
  export type AssistantToolChoice = ThreadsAPI.AssistantToolChoice;
  export type AssistantToolChoiceFunction = ThreadsAPI.AssistantToolChoiceFunction;
  export type AssistantToolChoiceOption = ThreadsAPI.AssistantToolChoiceOption;
  export type Thread = ThreadsAPI.Thread;
  export type ThreadDeleted = ThreadsAPI.ThreadDeleted;
  export type ThreadCreateParams = ThreadsAPI.ThreadCreateParams;
  export type ThreadUpdateParams = ThreadsAPI.ThreadUpdateParams;
  export type ThreadCreateAndRunParams = ThreadsAPI.ThreadCreateAndRunParams;
  export type ThreadCreateAndRunParamsNonStreaming = ThreadsAPI.ThreadCreateAndRunParamsNonStreaming;
  export type ThreadCreateAndRunParamsStreaming = ThreadsAPI.ThreadCreateAndRunParamsStreaming;
  export import Runs = RunsAPI.Runs;
  export type RequiredActionFunctionToolCall = RunsAPI.RequiredActionFunctionToolCall;
  export type Run = RunsAPI.Run;
  export type RunStatus = RunsAPI.RunStatus;
  export import RunsPage = RunsAPI.RunsPage;
  export type RunCreateParams = RunsAPI.RunCreateParams;
  export type RunCreateParamsNonStreaming = RunsAPI.RunCreateParamsNonStreaming;
  export type RunCreateParamsStreaming = RunsAPI.RunCreateParamsStreaming;
  export type RunUpdateParams = RunsAPI.RunUpdateParams;
  export type RunListParams = RunsAPI.RunListParams;
  export type RunSubmitToolOutputsParams = RunsAPI.RunSubmitToolOutputsParams;
  export type RunSubmitToolOutputsParamsNonStreaming = RunsAPI.RunSubmitToolOutputsParamsNonStreaming;
  export type RunSubmitToolOutputsParamsStreaming = RunsAPI.RunSubmitToolOutputsParamsStreaming;
  export import Messages = MessagesAPI.Messages;
  export type Annotation = MessagesAPI.Annotation;
  export type AnnotationDelta = MessagesAPI.AnnotationDelta;
  export type FileCitationAnnotation = MessagesAPI.FileCitationAnnotation;
  export type FileCitationDeltaAnnotation = MessagesAPI.FileCitationDeltaAnnotation;
  export type FilePathAnnotation = MessagesAPI.FilePathAnnotation;
  export type FilePathDeltaAnnotation = MessagesAPI.FilePathDeltaAnnotation;
  export type ImageFile = MessagesAPI.ImageFile;
  export type ImageFileContentBlock = MessagesAPI.ImageFileContentBlock;
  export type ImageFileDelta = MessagesAPI.ImageFileDelta;
  export type ImageFileDeltaBlock = MessagesAPI.ImageFileDeltaBlock;
  export type ImageURL = MessagesAPI.ImageURL;
  export type ImageURLContentBlock = MessagesAPI.ImageURLContentBlock;
  export type ImageURLDelta = MessagesAPI.ImageURLDelta;
  export type ImageURLDeltaBlock = MessagesAPI.ImageURLDeltaBlock;
  export type Message = MessagesAPI.Message;
  export type MessageContent = MessagesAPI.MessageContent;
  export type MessageContentDelta = MessagesAPI.MessageContentDelta;
  export type MessageContentPartParam = MessagesAPI.MessageContentPartParam;
  export type MessageDeleted = MessagesAPI.MessageDeleted;
  export type MessageDelta = MessagesAPI.MessageDelta;
  export type MessageDeltaEvent = MessagesAPI.MessageDeltaEvent;
  export type RefusalContentBlock = MessagesAPI.RefusalContentBlock;
  export type RefusalDeltaBlock = MessagesAPI.RefusalDeltaBlock;
  export type Text = MessagesAPI.Text;
  export type TextContentBlock = MessagesAPI.TextContentBlock;
  export type TextContentBlockParam = MessagesAPI.TextContentBlockParam;
  export type TextDelta = MessagesAPI.TextDelta;
  export type TextDeltaBlock = MessagesAPI.TextDeltaBlock;
  export import MessagesPage = MessagesAPI.MessagesPage;
  export type MessageCreateParams = MessagesAPI.MessageCreateParams;
  export type MessageUpdateParams = MessagesAPI.MessageUpdateParams;
  export type MessageListParams = MessagesAPI.MessageListParams;
}
