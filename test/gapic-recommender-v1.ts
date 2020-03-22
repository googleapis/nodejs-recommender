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

import * as protosTypes from '../protos/protos';
import * as assert from 'assert';
import {describe, it} from 'mocha';
const recommenderModule = require('../src');

const FAKE_STATUS_CODE = 1;
class FakeError {
  name: string;
  message: string;
  code: number;
  constructor(n: number) {
    this.name = 'fakeName';
    this.message = 'fake message';
    this.code = n;
  }
}
const error = new FakeError(FAKE_STATUS_CODE);
export interface Callback {
  (err: FakeError | null, response?: {} | null): void;
}

export class Operation {
  constructor() {}
  promise() {}
}
function mockSimpleGrpcMethod(
  expectedRequest: {},
  response: {} | null,
  error: FakeError | null
) {
  return (actualRequest: {}, options: {}, callback: Callback) => {
    assert.deepStrictEqual(actualRequest, expectedRequest);
    if (error) {
      callback(error);
    } else if (response) {
      callback(null, response);
    } else {
      callback(null);
    }
  };
}
describe('v1.RecommenderClient', () => {
  it('has servicePath', () => {
    const servicePath = recommenderModule.v1.RecommenderClient.servicePath;
    assert(servicePath);
  });
  it('has apiEndpoint', () => {
    const apiEndpoint = recommenderModule.v1.RecommenderClient.apiEndpoint;
    assert(apiEndpoint);
  });
  it('has port', () => {
    const port = recommenderModule.v1.RecommenderClient.port;
    assert(port);
    assert(typeof port === 'number');
  });
  it('should create a client with no option', () => {
    const client = new recommenderModule.v1.RecommenderClient();
    assert(client);
  });
  it('should create a client with gRPC fallback', () => {
    const client = new recommenderModule.v1.RecommenderClient({
      fallback: true,
    });
    assert(client);
  });
  it('has initialize method and supports deferred initialization', async () => {
    const client = new recommenderModule.v1.RecommenderClient({
      credentials: {client_email: 'bogus', private_key: 'bogus'},
      projectId: 'bogus',
    });
    assert.strictEqual(client.recommenderStub, undefined);
    await client.initialize();
    assert(client.recommenderStub);
  });
  it('has close method', () => {
    const client = new recommenderModule.v1.RecommenderClient({
      credentials: {client_email: 'bogus', private_key: 'bogus'},
      projectId: 'bogus',
    });
    client.close();
  });
  describe('getRecommendation', () => {
    it('invokes getRecommendation without error', done => {
      const client = new recommenderModule.v1.RecommenderClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      // Initialize client before mocking
      client.initialize();
      // Mock request
      const request: protosTypes.google.cloud.recommender.v1.IGetRecommendationRequest = {};
      request.name = '';
      // Mock response
      const expectedResponse = {};
      // Mock gRPC layer
      client._innerApiCalls.getRecommendation = mockSimpleGrpcMethod(
        request,
        expectedResponse,
        null
      );
      client.getRecommendation(request, (err: {}, response: {}) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });

    it('invokes getRecommendation with error', done => {
      const client = new recommenderModule.v1.RecommenderClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      // Initialize client before mocking
      client.initialize();
      // Mock request
      const request: protosTypes.google.cloud.recommender.v1.IGetRecommendationRequest = {};
      request.name = '';
      // Mock response
      const expectedResponse = {};
      // Mock gRPC layer
      client._innerApiCalls.getRecommendation = mockSimpleGrpcMethod(
        request,
        null,
        error
      );
      client.getRecommendation(request, (err: FakeError, response: {}) => {
        assert(err instanceof FakeError);
        assert.strictEqual(err.code, FAKE_STATUS_CODE);
        assert(typeof response === 'undefined');
        done();
      });
    });
  });
  describe('markRecommendationClaimed', () => {
    it('invokes markRecommendationClaimed without error', done => {
      const client = new recommenderModule.v1.RecommenderClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      // Initialize client before mocking
      client.initialize();
      // Mock request
      const request: protosTypes.google.cloud.recommender.v1.IMarkRecommendationClaimedRequest = {};
      request.name = '';
      // Mock response
      const expectedResponse = {};
      // Mock gRPC layer
      client._innerApiCalls.markRecommendationClaimed = mockSimpleGrpcMethod(
        request,
        expectedResponse,
        null
      );
      client.markRecommendationClaimed(request, (err: {}, response: {}) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });

    it('invokes markRecommendationClaimed with error', done => {
      const client = new recommenderModule.v1.RecommenderClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      // Initialize client before mocking
      client.initialize();
      // Mock request
      const request: protosTypes.google.cloud.recommender.v1.IMarkRecommendationClaimedRequest = {};
      request.name = '';
      // Mock response
      const expectedResponse = {};
      // Mock gRPC layer
      client._innerApiCalls.markRecommendationClaimed = mockSimpleGrpcMethod(
        request,
        null,
        error
      );
      client.markRecommendationClaimed(
        request,
        (err: FakeError, response: {}) => {
          assert(err instanceof FakeError);
          assert.strictEqual(err.code, FAKE_STATUS_CODE);
          assert(typeof response === 'undefined');
          done();
        }
      );
    });
  });
  describe('markRecommendationSucceeded', () => {
    it('invokes markRecommendationSucceeded without error', done => {
      const client = new recommenderModule.v1.RecommenderClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      // Initialize client before mocking
      client.initialize();
      // Mock request
      const request: protosTypes.google.cloud.recommender.v1.IMarkRecommendationSucceededRequest = {};
      request.name = '';
      // Mock response
      const expectedResponse = {};
      // Mock gRPC layer
      client._innerApiCalls.markRecommendationSucceeded = mockSimpleGrpcMethod(
        request,
        expectedResponse,
        null
      );
      client.markRecommendationSucceeded(request, (err: {}, response: {}) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });

    it('invokes markRecommendationSucceeded with error', done => {
      const client = new recommenderModule.v1.RecommenderClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      // Initialize client before mocking
      client.initialize();
      // Mock request
      const request: protosTypes.google.cloud.recommender.v1.IMarkRecommendationSucceededRequest = {};
      request.name = '';
      // Mock response
      const expectedResponse = {};
      // Mock gRPC layer
      client._innerApiCalls.markRecommendationSucceeded = mockSimpleGrpcMethod(
        request,
        null,
        error
      );
      client.markRecommendationSucceeded(
        request,
        (err: FakeError, response: {}) => {
          assert(err instanceof FakeError);
          assert.strictEqual(err.code, FAKE_STATUS_CODE);
          assert(typeof response === 'undefined');
          done();
        }
      );
    });
  });
  describe('markRecommendationFailed', () => {
    it('invokes markRecommendationFailed without error', done => {
      const client = new recommenderModule.v1.RecommenderClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      // Initialize client before mocking
      client.initialize();
      // Mock request
      const request: protosTypes.google.cloud.recommender.v1.IMarkRecommendationFailedRequest = {};
      request.name = '';
      // Mock response
      const expectedResponse = {};
      // Mock gRPC layer
      client._innerApiCalls.markRecommendationFailed = mockSimpleGrpcMethod(
        request,
        expectedResponse,
        null
      );
      client.markRecommendationFailed(request, (err: {}, response: {}) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });

    it('invokes markRecommendationFailed with error', done => {
      const client = new recommenderModule.v1.RecommenderClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      // Initialize client before mocking
      client.initialize();
      // Mock request
      const request: protosTypes.google.cloud.recommender.v1.IMarkRecommendationFailedRequest = {};
      request.name = '';
      // Mock response
      const expectedResponse = {};
      // Mock gRPC layer
      client._innerApiCalls.markRecommendationFailed = mockSimpleGrpcMethod(
        request,
        null,
        error
      );
      client.markRecommendationFailed(
        request,
        (err: FakeError, response: {}) => {
          assert(err instanceof FakeError);
          assert.strictEqual(err.code, FAKE_STATUS_CODE);
          assert(typeof response === 'undefined');
          done();
        }
      );
    });
  });
  describe('listRecommendations', () => {
    it('invokes listRecommendations without error', done => {
      const client = new recommenderModule.v1.RecommenderClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      // Initialize client before mocking
      client.initialize();
      // Mock request
      const request: protosTypes.google.cloud.recommender.v1.IListRecommendationsRequest = {};
      request.parent = '';
      // Mock response
      const expectedResponse = {};
      // Mock Grpc layer
      client._innerApiCalls.listRecommendations = (
        actualRequest: {},
        options: {},
        callback: Callback
      ) => {
        assert.deepStrictEqual(actualRequest, request);
        callback(null, expectedResponse);
      };
      client.listRecommendations(request, (err: FakeError, response: {}) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });
  });
  describe('listRecommendationsStream', () => {
    it('invokes listRecommendationsStream without error', done => {
      const client = new recommenderModule.v1.RecommenderClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      // Initialize client before mocking
      client.initialize();
      // Mock request
      const request: protosTypes.google.cloud.recommender.v1.IListRecommendationsRequest = {};
      request.parent = '';
      // Mock response
      const expectedResponse = {response: 'data'};
      // Mock Grpc layer
      client._innerApiCalls.listRecommendations = (
        actualRequest: {},
        options: {},
        callback: Callback
      ) => {
        assert.deepStrictEqual(actualRequest, request);
        callback(null, expectedResponse);
      };
      const stream = client
        .listRecommendationsStream(request, {})
        .on('data', (response: {}) => {
          assert.deepStrictEqual(response, expectedResponse);
          done();
        })
        .on('error', (err: FakeError) => {
          done(err);
        });
      stream.write(expectedResponse);
    });
  });
});
