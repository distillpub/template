
export function body(selector) {
  return `${selector} {
      width: auto;
      margin-left: 24px;
      margin-right: 24px;
      box-sizing: border-box;
    }
    @media(min-width: 768px) {
      ${selector} {
        margin-left: 72px;
        margin-right: 72px;
      }
    }
    @media(min-width: 1080px) {
      ${selector} {
        margin-left: calc(50% - 984px / 2);
        width: 648px;
      }
    }
  `;
}

export function page(selector) {
  return `${selector} {
      width: auto;
      margin-left: 24px;
      margin-right: 24px;
      box-sizing: border-box;
    }
    @media(min-width: 768px) {
      ${selector} {
        margin-left: 72px;
        margin-right: 72px;
      }
    }
    @media(min-width: 1080px) {
      ${selector} {
        width: 984px;
        margin-left: auto;
        margin-right: auto;
      }
    }
  `;
}

export function pagePadding(selector) {
  return `${selector} {
      width: auto;
      padding-left: 24px;
      padding-right: 24px;
      box-sizing: border-box;
    }
    @media(min-width: 768px) {
      ${selector} {
        padding-left: 72px;
        padding-right: 72px;
      }
    }
    @media(min-width: 1080px) {
      ${selector} {
        width: 984px;
        padding-left: auto;
        padding-right: auto;
      }
    }
  `;
}

export function screen(selector) {
  return `${selector} {
      width: auto;
      margin-left: 24px;
      margin-right: 24px;
      box-sizing: border-box;
    }
    @media(min-width: 768px) {
      ${selector} {
        margin-left: 72px;
        margin-right: 72px;
      }
    }
    @media(min-width: 1080px) {
      ${selector} {
        margin-left: auto;
        margin-right: auto;
        width: auto;
      }
    }
  `;
}
