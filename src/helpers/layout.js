// Copyright 2018 The Distill Template Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// const marginSmall = 16;
// const marginLarge = 3 * marginSmall;
// const margin = marginSmall + marginLarge;
// const gutter = marginSmall;
// const outsetAmount = margin / 2;
// const numCols = 4;
// const numGutters = numCols - 1;
// const columnWidth = (768 - 2 * marginLarge - numGutters * gutter) / numCols;
//
// const screenwidth = 768;
// const pageWidth = screenwidth - 2 * marginLarge;
// const bodyWidth = pageWidth - columnWidth - gutter;

export function body(selector) {
  return `${selector} {
      grid-column: left / text;
    }
  `;
}

export function page(selector) {
  return `${selector} {
      grid-column: left / page;
    }
  `;
}

export function screen(selector) {
  return `${selector} {
    grid-column: start / end;
  }
  `;
}
