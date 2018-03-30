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

export default function(dom) {
  if (!dom.querySelector("html").getAttribute("lang")) {
    dom.querySelector("html").setAttribute("lang", "en")
  }

  let head = dom.querySelector("head");

  if (!dom.querySelector("meta[charset]")) {
    let meta = dom.createElement("meta");
    meta.setAttribute("charset", "utf-8");
    head.appendChild(meta);
  }
  if (!dom.querySelector("meta[name=viewport]")) {
    let meta = dom.createElement("meta");
    meta.setAttribute("name", "viewport");
    meta.setAttribute("content", "width=device-width, initial-scale=1");
    head.appendChild(meta);
  }
}
