export function propName(attr) {
  return attr.replace(/(\-[a-z])/g, (s) => s.toUpperCase().replace('-', ''));
}

export function attrName(prop) {
  return prop.replace(/([A-Z])/g, (s) => '-' + s.toLowerCase());
}

export function deserializeAttribute(value, type) {
  switch (type) {
    case String:
      break;
    case Array:
    case Object:
      try {
        value = JSON.parse(value);
      } catch (e) {
      }
      break;
    case Boolean:
      value = value != 'false' && value != '0' && value;
      break;
    default:
  }
  return value;
}

const immediately = window.setImmediate || function(fn, args) {
  window.setTimeout(function() {
    fn.apply(this, args);
  }, 0);
};

export const Properties = (properties) => {
  const keys = Object.keys(properties);
  const attrs = keys.map((k) => attrName(k));
  return (superclass) => {
    const cls = class extends superclass {
      static get observedAttributes() {
        return attrs;
      }
      attributeChangedCallback(attr, oldValue, newValue) {
        const prop = propName(attr);
        const value = deserializeAttribute(newValue, properties[prop].type);
        this[prop] = value;
      }
      _propertiesChanged() {
        if (!this.propertiesChangedCallback) {
          return;
        }
        clearTimeout(this._propertiesChangedTimeout);
        this._propertiesChangedTimeout = immediately(() => {
          this.propertiesChangedCallback(this);
        });
      }
    }
    keys.forEach(function(k) {
      const secret = `_${k}`;
      const callback = `${k}Changed`;
      const defaultValue = properties[k].value;
      Object.defineProperty(cls.prototype, k, {
        get: function() {
          let value = this[secret];
          if (value) {
            return value;
          }
          if (defaultValue && typeof defaultValue == 'function') {
            this[secret] = defaultValue();
          } else {
            this[secret] = defaultValue;
          }
          return this[secret];
        },
        set: function(value) {
          const oldValue = this[secret];
          this[secret] = value;
          if (this[callback]) {
            this[callback](value, oldValue);
          }
          this._propertiesChanged();
        }
      });
    });
    return cls;
  };
};