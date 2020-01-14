/**
 * Copyright 2019, Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

/**
 * DESCRIBE WHAT THIS SAMPLE DOES.
 * @param {string} LIST EXPECTED ARGUMENTS.
 */
async function main(project = 'my-project') {
  // [START recommender_quickstart]
  async function listRecommendations() {
    const {RecommenderClient} = require('@google-cloud/recommender');
    const recommender = new RecommenderClient({
      projectId: project,
    });

    // parent = 'projects/my-project', // Project to fetch recommendations for.

    const [recommendations] = await recommender.listRecommendations({
      parent: `projects/${project}`,
    });
    console.info(recommendations);
    return recommendations;
  }
  const recommendations = await listRecommendations();
  // [END recommender_quickstart]
  return recommendations;
}

main(...process.argv.slice(2)).catch(err => {
  console.error(err);
  process.exitCode = 1;
});
