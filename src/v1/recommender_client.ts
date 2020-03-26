// Copyright 2020 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// ** This file is automatically generated by gapic-generator-typescript. **
// ** https://github.com/googleapis/gapic-generator-typescript **
// ** All changes to this file may be overwritten. **

import * as gax from 'google-gax';
import {APICallback, Callback, CallOptions, Descriptors, ClientOptions, PaginationCallback} from 'google-gax';
import * as path from 'path';

import { Transform } from 'stream';
import * as protosTypes from '../../protos/protos';
import * as gapicConfig from './recommender_client_config.json';

const version = require('../../../package.json').version;

/**
 *  Provides recommendations for cloud customers for various categories like
 *  performance optimization, cost savings, reliability, feature discovery, etc.
 *  These recommendations are generated automatically based on analysis of user
 *  resources, configuration and monitoring metrics.
 * @class
 * @memberof v1
 */
export class RecommenderClient {
  private _descriptors: Descriptors = {page: {}, stream: {}, longrunning: {}, batching: {}};
  private _innerApiCalls: {[name: string]: Function};
  private _pathTemplates: {[name: string]: gax.PathTemplate};
  private _terminated = false;
  private _opts: ClientOptions;
  private _gaxModule: typeof gax | typeof gax.fallback;
  private _gaxGrpc: gax.GrpcClient | gax.fallback.GrpcClient;
  private _protos: {};
  private _defaults: {[method: string]: gax.CallSettings};
  auth: gax.GoogleAuth;
  recommenderStub?: Promise<{[name: string]: Function}>;

  /**
   * Construct an instance of RecommenderClient.
   *
   * @param {object} [options] - The configuration object. See the subsequent
   *   parameters for more details.
   * @param {object} [options.credentials] - Credentials object.
   * @param {string} [options.credentials.client_email]
   * @param {string} [options.credentials.private_key]
   * @param {string} [options.email] - Account email address. Required when
   *     using a .pem or .p12 keyFilename.
   * @param {string} [options.keyFilename] - Full path to the a .json, .pem, or
   *     .p12 key downloaded from the Google Developers Console. If you provide
   *     a path to a JSON file, the projectId option below is not necessary.
   *     NOTE: .pem and .p12 require you to specify options.email as well.
   * @param {number} [options.port] - The port on which to connect to
   *     the remote host.
   * @param {string} [options.projectId] - The project ID from the Google
   *     Developer's Console, e.g. 'grape-spaceship-123'. We will also check
   *     the environment variable GCLOUD_PROJECT for your project ID. If your
   *     app is running in an environment which supports
   *     {@link https://developers.google.com/identity/protocols/application-default-credentials Application Default Credentials},
   *     your project ID will be detected automatically.
   * @param {string} [options.apiEndpoint] - The domain name of the
   *     API remote host.
   */

  constructor(opts?: ClientOptions) {
    // Ensure that options include the service address and port.
    const staticMembers = this.constructor as typeof RecommenderClient;
    const servicePath = opts && opts.servicePath ?
        opts.servicePath :
        ((opts && opts.apiEndpoint) ? opts.apiEndpoint :
                                      staticMembers.servicePath);
    const port = opts && opts.port ? opts.port : staticMembers.port;

    if (!opts) {
      opts = {servicePath, port};
    }
    opts.servicePath = opts.servicePath || servicePath;
    opts.port = opts.port || port;
    opts.clientConfig = opts.clientConfig || {};

    const isBrowser = (typeof window !== 'undefined');
    if (isBrowser){
      opts.fallback = true;
    }
    // If we are in browser, we are already using fallback because of the
    // "browser" field in package.json.
    // But if we were explicitly requested to use fallback, let's do it now.
    this._gaxModule = !isBrowser && opts.fallback ? gax.fallback : gax;

    // Create a `gaxGrpc` object, with any grpc-specific options
    // sent to the client.
    opts.scopes = (this.constructor as typeof RecommenderClient).scopes;
    this._gaxGrpc = new this._gaxModule.GrpcClient(opts);

    // Save options to use in initialize() method.
    this._opts = opts;

    // Save the auth object to the client, for use by other methods.
    this.auth = (this._gaxGrpc.auth as gax.GoogleAuth);

    // Determine the client header string.
    const clientHeader = [
      `gax/${this._gaxModule.version}`,
      `gapic/${version}`,
    ];
    if (typeof process !== 'undefined' && 'versions' in process) {
      clientHeader.push(`gl-node/${process.versions.node}`);
    } else {
      clientHeader.push(`gl-web/${this._gaxModule.version}`);
    }
    if (!opts.fallback) {
      clientHeader.push(`grpc/${this._gaxGrpc.grpcVersion}`);
    }
    if (opts.libName && opts.libVersion) {
      clientHeader.push(`${opts.libName}/${opts.libVersion}`);
    }
    // Load the applicable protos.
    // For Node.js, pass the path to JSON proto file.
    // For browsers, pass the JSON content.

    const nodejsProtoPath = path.join(__dirname, '..', '..', 'protos', 'protos.json');
    this._protos = this._gaxGrpc.loadProto(
      opts.fallback ?
        require("../../protos/protos.json") :
        nodejsProtoPath
    );

    // This API contains "path templates"; forward-slash-separated
    // identifiers to uniquely identify resources within the API.
    // Create useful helper objects for these.
    this._pathTemplates = {
      recommendationPathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}/locations/{location}/recommenders/{recommender}/recommendations/{recommendation}'
      ),
      recommenderPathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}/locations/{location}/recommenders/{recommender}'
      ),
    };

    // Some of the methods on this service return "paged" results,
    // (e.g. 50 results at a time, with tokens to get subsequent
    // pages). Denote the keys used for pagination and results.
    this._descriptors.page = {
      listRecommendations:
          new this._gaxModule.PageDescriptor('pageToken', 'nextPageToken', 'recommendations')
    };

    // Put together the default options sent with requests.
    this._defaults = this._gaxGrpc.constructSettings(
        'google.cloud.recommender.v1.Recommender', gapicConfig as gax.ClientConfig,
        opts.clientConfig || {}, {'x-goog-api-client': clientHeader.join(' ')});

    // Set up a dictionary of "inner API calls"; the core implementation
    // of calling the API is handled in `google-gax`, with this code
    // merely providing the destination and request information.
    this._innerApiCalls = {};
  }

  /**
   * Initialize the client.
   * Performs asynchronous operations (such as authentication) and prepares the client.
   * This function will be called automatically when any class method is called for the
   * first time, but if you need to initialize it before calling an actual method,
   * feel free to call initialize() directly.
   *
   * You can await on this method if you want to make sure the client is initialized.
   *
   * @returns {Promise} A promise that resolves to an authenticated service stub.
   */
  initialize() {
    // If the client stub promise is already initialized, return immediately.
    if (this.recommenderStub) {
      return this.recommenderStub;
    }

    // Put together the "service stub" for
    // google.cloud.recommender.v1.Recommender.
    this.recommenderStub = this._gaxGrpc.createStub(
        this._opts.fallback ?
          (this._protos as protobuf.Root).lookupService('google.cloud.recommender.v1.Recommender') :
          /* eslint-disable @typescript-eslint/no-explicit-any */
          (this._protos as any).google.cloud.recommender.v1.Recommender,
        this._opts) as Promise<{[method: string]: Function}>;

    // Iterate over each of the methods that the service provides
    // and create an API call method for each.
    const recommenderStubMethods =
        ['listRecommendations', 'getRecommendation', 'markRecommendationClaimed', 'markRecommendationSucceeded', 'markRecommendationFailed'];

    for (const methodName of recommenderStubMethods) {
      const innerCallPromise = this.recommenderStub.then(
        stub => (...args: Array<{}>) => {
          if (this._terminated) {
            return Promise.reject('The client has already been closed.');
          }
          const func = stub[methodName];
          return func.apply(stub, args);
        },
        (err: Error|null|undefined) => () => {
          throw err;
        });

      const apiCall = this._gaxModule.createApiCall(
        innerCallPromise,
        this._defaults[methodName],
        this._descriptors.page[methodName] ||
            this._descriptors.stream[methodName] ||
            this._descriptors.longrunning[methodName]
      );

      this._innerApiCalls[methodName] = (
        argument: {},
        callOptions?: CallOptions,
        callback?: APICallback
      ) => {
        return apiCall(argument, callOptions, callback);
      };
    }

    return this.recommenderStub;
  }

  /**
   * The DNS address for this API service.
   */
  static get servicePath() {
    return 'recommender.googleapis.com';
  }

  /**
   * The DNS address for this API service - same as servicePath(),
   * exists for compatibility reasons.
   */
  static get apiEndpoint() {
    return 'recommender.googleapis.com';
  }

  /**
   * The port for this API service.
   */
  static get port() {
    return 443;
  }

  /**
   * The scopes needed to make gRPC calls for every method defined
   * in this service.
   */
  static get scopes() {
    return [
      'https://www.googleapis.com/auth/cloud-platform'
    ];
  }

  getProjectId(): Promise<string>;
  getProjectId(callback: Callback<string, undefined, undefined>): void;
  /**
   * Return the project ID used by this class.
   * @param {function(Error, string)} callback - the callback to
   *   be called with the current project Id.
   */
  getProjectId(callback?: Callback<string, undefined, undefined>):
      Promise<string>|void {
    if (callback) {
      this.auth.getProjectId(callback);
      return;
    }
    return this.auth.getProjectId();
  }

  // -------------------
  // -- Service calls --
  // -------------------
  getRecommendation(
      request: protosTypes.google.cloud.recommender.v1.IGetRecommendationRequest,
      options?: gax.CallOptions):
      Promise<[
        protosTypes.google.cloud.recommender.v1.IRecommendation,
        protosTypes.google.cloud.recommender.v1.IGetRecommendationRequest|undefined, {}|undefined
      ]>;
  getRecommendation(
      request: protosTypes.google.cloud.recommender.v1.IGetRecommendationRequest,
      options: gax.CallOptions,
      callback: Callback<
          protosTypes.google.cloud.recommender.v1.IRecommendation,
          protosTypes.google.cloud.recommender.v1.IGetRecommendationRequest|undefined,
          {}|undefined>): void;
/**
 * Gets the requested recommendation. Requires the recommender.*.get
 * IAM permission for the specified recommender.
 *
 * @param {Object} request
 *   The request object that will be sent.
 * @param {string} request.name
 *   Required. Name of the recommendation.
 * @param {object} [options]
 *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
 * @returns {Promise} - The promise which resolves to an array.
 *   The first element of the array is an object representing [Recommendation]{@link google.cloud.recommender.v1.Recommendation}.
 *   The promise has a method named "cancel" which cancels the ongoing API call.
 */
  getRecommendation(
      request: protosTypes.google.cloud.recommender.v1.IGetRecommendationRequest,
      optionsOrCallback?: gax.CallOptions|Callback<
          protosTypes.google.cloud.recommender.v1.IRecommendation,
          protosTypes.google.cloud.recommender.v1.IGetRecommendationRequest|undefined, {}|undefined>,
      callback?: Callback<
          protosTypes.google.cloud.recommender.v1.IRecommendation,
          protosTypes.google.cloud.recommender.v1.IGetRecommendationRequest|undefined,
          {}|undefined>):
      Promise<[
        protosTypes.google.cloud.recommender.v1.IRecommendation,
        protosTypes.google.cloud.recommender.v1.IGetRecommendationRequest|undefined, {}|undefined
      ]>|void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    }
    else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      'name': request.name || '',
    });
    this.initialize();
    return this._innerApiCalls.getRecommendation(request, options, callback);
  }
  markRecommendationClaimed(
      request: protosTypes.google.cloud.recommender.v1.IMarkRecommendationClaimedRequest,
      options?: gax.CallOptions):
      Promise<[
        protosTypes.google.cloud.recommender.v1.IRecommendation,
        protosTypes.google.cloud.recommender.v1.IMarkRecommendationClaimedRequest|undefined, {}|undefined
      ]>;
  markRecommendationClaimed(
      request: protosTypes.google.cloud.recommender.v1.IMarkRecommendationClaimedRequest,
      options: gax.CallOptions,
      callback: Callback<
          protosTypes.google.cloud.recommender.v1.IRecommendation,
          protosTypes.google.cloud.recommender.v1.IMarkRecommendationClaimedRequest|undefined,
          {}|undefined>): void;
/**
 * Mark the Recommendation State as Claimed. Users can use this method to
 * indicate to the Recommender API that they are starting to apply the
 * recommendation themselves. This stops the recommendation content from being
 * updated.
 *
 * MarkRecommendationClaimed can be applied to recommendations in CLAIMED,
 * SUCCEEDED, FAILED, or ACTIVE state.
 *
 * Requires the recommender.*.update IAM permission for the specified
 * recommender.
 *
 * @param {Object} request
 *   The request object that will be sent.
 * @param {string} request.name
 *   Required. Name of the recommendation.
 * @param {number[]} request.stateMetadata
 *   State properties to include with this state. Overwrites any existing
 *   `state_metadata`.
 *   Keys must match the regex /^{@link a-z0-9_.-|a-z0-9}{0,62}$/.
 *   Values must match the regex /^[a-zA-Z0-9_./-]{0,255}$/.
 * @param {string} request.etag
 *   Required. Fingerprint of the Recommendation. Provides optimistic locking.
 * @param {object} [options]
 *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
 * @returns {Promise} - The promise which resolves to an array.
 *   The first element of the array is an object representing [Recommendation]{@link google.cloud.recommender.v1.Recommendation}.
 *   The promise has a method named "cancel" which cancels the ongoing API call.
 */
  markRecommendationClaimed(
      request: protosTypes.google.cloud.recommender.v1.IMarkRecommendationClaimedRequest,
      optionsOrCallback?: gax.CallOptions|Callback<
          protosTypes.google.cloud.recommender.v1.IRecommendation,
          protosTypes.google.cloud.recommender.v1.IMarkRecommendationClaimedRequest|undefined, {}|undefined>,
      callback?: Callback<
          protosTypes.google.cloud.recommender.v1.IRecommendation,
          protosTypes.google.cloud.recommender.v1.IMarkRecommendationClaimedRequest|undefined,
          {}|undefined>):
      Promise<[
        protosTypes.google.cloud.recommender.v1.IRecommendation,
        protosTypes.google.cloud.recommender.v1.IMarkRecommendationClaimedRequest|undefined, {}|undefined
      ]>|void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    }
    else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      'name': request.name || '',
    });
    this.initialize();
    return this._innerApiCalls.markRecommendationClaimed(request, options, callback);
  }
  markRecommendationSucceeded(
      request: protosTypes.google.cloud.recommender.v1.IMarkRecommendationSucceededRequest,
      options?: gax.CallOptions):
      Promise<[
        protosTypes.google.cloud.recommender.v1.IRecommendation,
        protosTypes.google.cloud.recommender.v1.IMarkRecommendationSucceededRequest|undefined, {}|undefined
      ]>;
  markRecommendationSucceeded(
      request: protosTypes.google.cloud.recommender.v1.IMarkRecommendationSucceededRequest,
      options: gax.CallOptions,
      callback: Callback<
          protosTypes.google.cloud.recommender.v1.IRecommendation,
          protosTypes.google.cloud.recommender.v1.IMarkRecommendationSucceededRequest|undefined,
          {}|undefined>): void;
/**
 * Mark the Recommendation State as Succeeded. Users can use this method to
 * indicate to the Recommender API that they have applied the recommendation
 * themselves, and the operation was successful. This stops the recommendation
 * content from being updated.
 *
 * MarkRecommendationSucceeded can be applied to recommendations in ACTIVE,
 * CLAIMED, SUCCEEDED, or FAILED state.
 *
 * Requires the recommender.*.update IAM permission for the specified
 * recommender.
 *
 * @param {Object} request
 *   The request object that will be sent.
 * @param {string} request.name
 *   Required. Name of the recommendation.
 * @param {number[]} request.stateMetadata
 *   State properties to include with this state. Overwrites any existing
 *   `state_metadata`.
 *   Keys must match the regex /^{@link a-z0-9_.-|a-z0-9}{0,62}$/.
 *   Values must match the regex /^[a-zA-Z0-9_./-]{0,255}$/.
 * @param {string} request.etag
 *   Required. Fingerprint of the Recommendation. Provides optimistic locking.
 * @param {object} [options]
 *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
 * @returns {Promise} - The promise which resolves to an array.
 *   The first element of the array is an object representing [Recommendation]{@link google.cloud.recommender.v1.Recommendation}.
 *   The promise has a method named "cancel" which cancels the ongoing API call.
 */
  markRecommendationSucceeded(
      request: protosTypes.google.cloud.recommender.v1.IMarkRecommendationSucceededRequest,
      optionsOrCallback?: gax.CallOptions|Callback<
          protosTypes.google.cloud.recommender.v1.IRecommendation,
          protosTypes.google.cloud.recommender.v1.IMarkRecommendationSucceededRequest|undefined, {}|undefined>,
      callback?: Callback<
          protosTypes.google.cloud.recommender.v1.IRecommendation,
          protosTypes.google.cloud.recommender.v1.IMarkRecommendationSucceededRequest|undefined,
          {}|undefined>):
      Promise<[
        protosTypes.google.cloud.recommender.v1.IRecommendation,
        protosTypes.google.cloud.recommender.v1.IMarkRecommendationSucceededRequest|undefined, {}|undefined
      ]>|void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    }
    else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      'name': request.name || '',
    });
    this.initialize();
    return this._innerApiCalls.markRecommendationSucceeded(request, options, callback);
  }
  markRecommendationFailed(
      request: protosTypes.google.cloud.recommender.v1.IMarkRecommendationFailedRequest,
      options?: gax.CallOptions):
      Promise<[
        protosTypes.google.cloud.recommender.v1.IRecommendation,
        protosTypes.google.cloud.recommender.v1.IMarkRecommendationFailedRequest|undefined, {}|undefined
      ]>;
  markRecommendationFailed(
      request: protosTypes.google.cloud.recommender.v1.IMarkRecommendationFailedRequest,
      options: gax.CallOptions,
      callback: Callback<
          protosTypes.google.cloud.recommender.v1.IRecommendation,
          protosTypes.google.cloud.recommender.v1.IMarkRecommendationFailedRequest|undefined,
          {}|undefined>): void;
/**
 * Mark the Recommendation State as Failed. Users can use this method to
 * indicate to the Recommender API that they have applied the recommendation
 * themselves, and the operation failed. This stops the recommendation content
 * from being updated.
 *
 * MarkRecommendationFailed can be applied to recommendations in ACTIVE,
 * CLAIMED, SUCCEEDED, or FAILED state.
 *
 * Requires the recommender.*.update IAM permission for the specified
 * recommender.
 *
 * @param {Object} request
 *   The request object that will be sent.
 * @param {string} request.name
 *   Required. Name of the recommendation.
 * @param {number[]} request.stateMetadata
 *   State properties to include with this state. Overwrites any existing
 *   `state_metadata`.
 *   Keys must match the regex /^{@link a-z0-9_.-|a-z0-9}{0,62}$/.
 *   Values must match the regex /^[a-zA-Z0-9_./-]{0,255}$/.
 * @param {string} request.etag
 *   Required. Fingerprint of the Recommendation. Provides optimistic locking.
 * @param {object} [options]
 *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
 * @returns {Promise} - The promise which resolves to an array.
 *   The first element of the array is an object representing [Recommendation]{@link google.cloud.recommender.v1.Recommendation}.
 *   The promise has a method named "cancel" which cancels the ongoing API call.
 */
  markRecommendationFailed(
      request: protosTypes.google.cloud.recommender.v1.IMarkRecommendationFailedRequest,
      optionsOrCallback?: gax.CallOptions|Callback<
          protosTypes.google.cloud.recommender.v1.IRecommendation,
          protosTypes.google.cloud.recommender.v1.IMarkRecommendationFailedRequest|undefined, {}|undefined>,
      callback?: Callback<
          protosTypes.google.cloud.recommender.v1.IRecommendation,
          protosTypes.google.cloud.recommender.v1.IMarkRecommendationFailedRequest|undefined,
          {}|undefined>):
      Promise<[
        protosTypes.google.cloud.recommender.v1.IRecommendation,
        protosTypes.google.cloud.recommender.v1.IMarkRecommendationFailedRequest|undefined, {}|undefined
      ]>|void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    }
    else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      'name': request.name || '',
    });
    this.initialize();
    return this._innerApiCalls.markRecommendationFailed(request, options, callback);
  }

  listRecommendations(
      request: protosTypes.google.cloud.recommender.v1.IListRecommendationsRequest,
      options?: gax.CallOptions):
      Promise<[
        protosTypes.google.cloud.recommender.v1.IRecommendation[],
        protosTypes.google.cloud.recommender.v1.IListRecommendationsRequest|null,
        protosTypes.google.cloud.recommender.v1.IListRecommendationsResponse
      ]>;
  listRecommendations(
      request: protosTypes.google.cloud.recommender.v1.IListRecommendationsRequest,
      options: gax.CallOptions,
      callback: PaginationCallback<
          protosTypes.google.cloud.recommender.v1.IRecommendation[],
          protosTypes.google.cloud.recommender.v1.IListRecommendationsRequest|null,
          protosTypes.google.cloud.recommender.v1.IListRecommendationsResponse>): void;
/**
 * Lists recommendations for a Cloud project. Requires the recommender.*.list
 * IAM permission for the specified recommender.
 *
 * @param {Object} request
 *   The request object that will be sent.
 * @param {string} request.parent
 *   Required. The container resource on which to execute the request.
 *   Acceptable formats:
 *
 *   1.
 *   "projects/[PROJECT_NUMBER]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]",
 *
 *   LOCATION here refers to GCP Locations:
 *   https://cloud.google.com/about/locations/
 * @param {number} [request.pageSize]
 *   Optional. The maximum number of results to return from this request.  Non-positive
 *   values are ignored. If not specified, the server will determine the number
 *   of results to return.
 * @param {string} [request.pageToken]
 *   Optional. If present, retrieves the next batch of results from the preceding call to
 *   this method. `page_token` must be the value of `next_page_token` from the
 *   previous response. The values of other method parameters must be identical
 *   to those in the previous call.
 * @param {string} request.filter
 *   Filter expression to restrict the recommendations returned. Supported
 *   filter fields: state_info.state
 *   Eg: `state_info.state:"DISMISSED" or state_info.state:"FAILED"
 * @param {object} [options]
 *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
 * @returns {Promise} - The promise which resolves to an array.
 *   The first element of the array is Array of [Recommendation]{@link google.cloud.recommender.v1.Recommendation}.
 *   The client library support auto-pagination by default: it will call the API as many
 *   times as needed and will merge results from all the pages into this array.
 *
 *   When autoPaginate: false is specified through options, the array has three elements.
 *   The first element is Array of [Recommendation]{@link google.cloud.recommender.v1.Recommendation} that corresponds to
 *   the one page received from the API server.
 *   If the second element is not null it contains the request object of type [ListRecommendationsRequest]{@link google.cloud.recommender.v1.ListRecommendationsRequest}
 *   that can be used to obtain the next page of the results.
 *   If it is null, the next page does not exist.
 *   The third element contains the raw response received from the API server. Its type is
 *   [ListRecommendationsResponse]{@link google.cloud.recommender.v1.ListRecommendationsResponse}.
 *
 *   The promise has a method named "cancel" which cancels the ongoing API call.
 */
  listRecommendations(
      request: protosTypes.google.cloud.recommender.v1.IListRecommendationsRequest,
      optionsOrCallback?: gax.CallOptions|PaginationCallback<
          protosTypes.google.cloud.recommender.v1.IRecommendation[],
          protosTypes.google.cloud.recommender.v1.IListRecommendationsRequest|null,
          protosTypes.google.cloud.recommender.v1.IListRecommendationsResponse>,
      callback?: PaginationCallback<
          protosTypes.google.cloud.recommender.v1.IRecommendation[],
          protosTypes.google.cloud.recommender.v1.IListRecommendationsRequest|null,
          protosTypes.google.cloud.recommender.v1.IListRecommendationsResponse>):
      Promise<[
        protosTypes.google.cloud.recommender.v1.IRecommendation[],
        protosTypes.google.cloud.recommender.v1.IListRecommendationsRequest|null,
        protosTypes.google.cloud.recommender.v1.IListRecommendationsResponse
      ]>|void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    }
    else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      'parent': request.parent || '',
    });
    this.initialize();
    return this._innerApiCalls.listRecommendations(request, options, callback);
  }

/**
 * Equivalent to {@link listRecommendations}, but returns a NodeJS Stream object.
 *
 * This fetches the paged responses for {@link listRecommendations} continuously
 * and invokes the callback registered for 'data' event for each element in the
 * responses.
 *
 * The returned object has 'end' method when no more elements are required.
 *
 * autoPaginate option will be ignored.
 *
 * @see {@link https://nodejs.org/api/stream.html}
 *
 * @param {Object} request
 *   The request object that will be sent.
 * @param {string} request.parent
 *   Required. The container resource on which to execute the request.
 *   Acceptable formats:
 *
 *   1.
 *   "projects/[PROJECT_NUMBER]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]",
 *
 *   LOCATION here refers to GCP Locations:
 *   https://cloud.google.com/about/locations/
 * @param {number} [request.pageSize]
 *   Optional. The maximum number of results to return from this request.  Non-positive
 *   values are ignored. If not specified, the server will determine the number
 *   of results to return.
 * @param {string} [request.pageToken]
 *   Optional. If present, retrieves the next batch of results from the preceding call to
 *   this method. `page_token` must be the value of `next_page_token` from the
 *   previous response. The values of other method parameters must be identical
 *   to those in the previous call.
 * @param {string} request.filter
 *   Filter expression to restrict the recommendations returned. Supported
 *   filter fields: state_info.state
 *   Eg: `state_info.state:"DISMISSED" or state_info.state:"FAILED"
 * @param {object} [options]
 *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
 * @returns {Stream}
 *   An object stream which emits an object representing [Recommendation]{@link google.cloud.recommender.v1.Recommendation} on 'data' event.
 */
  listRecommendationsStream(
      request?: protosTypes.google.cloud.recommender.v1.IListRecommendationsRequest,
      options?: gax.CallOptions):
    Transform{
    request = request || {};
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      'parent': request.parent || '',
    });
    const callSettings = new gax.CallSettings(options);
    this.initialize();
    return this._descriptors.page.listRecommendations.createStream(
      this._innerApiCalls.listRecommendations as gax.GaxCall,
      request,
      callSettings
    );
  }
  // --------------------
  // -- Path templates --
  // --------------------

  /**
   * Return a fully-qualified recommendation resource name string.
   *
   * @param {string} project
   * @param {string} location
   * @param {string} recommender
   * @param {string} recommendation
   * @returns {string} Resource name string.
   */
  recommendationPath(project:string,location:string,recommender:string,recommendation:string) {
    return this._pathTemplates.recommendationPathTemplate.render({
      project,
      location,
      recommender,
      recommendation,
    });
  }

  /**
   * Parse the project from Recommendation resource.
   *
   * @param {string} recommendationName
   *   A fully-qualified path representing Recommendation resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromRecommendationName(recommendationName: string) {
    return this._pathTemplates.recommendationPathTemplate.match(recommendationName).project;
  }

  /**
   * Parse the location from Recommendation resource.
   *
   * @param {string} recommendationName
   *   A fully-qualified path representing Recommendation resource.
   * @returns {string} A string representing the location.
   */
  matchLocationFromRecommendationName(recommendationName: string) {
    return this._pathTemplates.recommendationPathTemplate.match(recommendationName).location;
  }

  /**
   * Parse the recommender from Recommendation resource.
   *
   * @param {string} recommendationName
   *   A fully-qualified path representing Recommendation resource.
   * @returns {string} A string representing the recommender.
   */
  matchRecommenderFromRecommendationName(recommendationName: string) {
    return this._pathTemplates.recommendationPathTemplate.match(recommendationName).recommender;
  }

  /**
   * Parse the recommendation from Recommendation resource.
   *
   * @param {string} recommendationName
   *   A fully-qualified path representing Recommendation resource.
   * @returns {string} A string representing the recommendation.
   */
  matchRecommendationFromRecommendationName(recommendationName: string) {
    return this._pathTemplates.recommendationPathTemplate.match(recommendationName).recommendation;
  }

  /**
   * Return a fully-qualified recommender resource name string.
   *
   * @param {string} project
   * @param {string} location
   * @param {string} recommender
   * @returns {string} Resource name string.
   */
  recommenderPath(project:string,location:string,recommender:string) {
    return this._pathTemplates.recommenderPathTemplate.render({
      project,
      location,
      recommender,
    });
  }

  /**
   * Parse the project from Recommender resource.
   *
   * @param {string} recommenderName
   *   A fully-qualified path representing Recommender resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromRecommenderName(recommenderName: string) {
    return this._pathTemplates.recommenderPathTemplate.match(recommenderName).project;
  }

  /**
   * Parse the location from Recommender resource.
   *
   * @param {string} recommenderName
   *   A fully-qualified path representing Recommender resource.
   * @returns {string} A string representing the location.
   */
  matchLocationFromRecommenderName(recommenderName: string) {
    return this._pathTemplates.recommenderPathTemplate.match(recommenderName).location;
  }

  /**
   * Parse the recommender from Recommender resource.
   *
   * @param {string} recommenderName
   *   A fully-qualified path representing Recommender resource.
   * @returns {string} A string representing the recommender.
   */
  matchRecommenderFromRecommenderName(recommenderName: string) {
    return this._pathTemplates.recommenderPathTemplate.match(recommenderName).recommender;
  }

  /**
   * Terminate the GRPC channel and close the client.
   *
   * The client will no longer be usable and all future behavior is undefined.
   */
  close(): Promise<void> {
    this.initialize();
    if (!this._terminated) {
      return this.recommenderStub!.then(stub => {
        this._terminated = true;
        stub.close();
      });
    }
    return Promise.resolve();
  }
}
