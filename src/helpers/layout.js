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
      grid-column: margin-left / body;
    }
  `;
}

export function page(selector) {
  return `${selector} {
      grid-column: margin-left / page;
    }
  `;
}

export function screen(selector) {
  return `${selector} {
    grid-column: start / end;
  }
  `;
}
