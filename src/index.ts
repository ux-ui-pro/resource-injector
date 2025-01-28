class ResourceInjector {
  private static loadedResources: Map<string, Promise<void>> = new Map();

  constructor() {}

  async loadResource(config: {
    url: string;
    type: 'script' | 'style';
    options?: Partial<HTMLScriptElement | HTMLLinkElement>;
    timeout?: number;
    forceReload?: boolean;
    appendTimestamp?: boolean;
  }): Promise<void> {
    const {
      url,
      type,
      options = {},
      timeout = 10000,
      forceReload = false,
      appendTimestamp = false,
    } = config;

    const resourceUrl = appendTimestamp ? `${url}?t=${Date.now()}` : url;

    if (!forceReload && ResourceInjector.loadedResources.has(resourceUrl)) {
      return ResourceInjector.loadedResources.get(resourceUrl) as Promise<void>;
    }

    if (forceReload) {
      const existingElement = document.querySelector(
        type === 'script' ? `script[src="${url}"]` : `link[href="${url}"]`,
      );

      if (existingElement) {
        existingElement.remove();
      }

      ResourceInjector.loadedResources.delete(resourceUrl);
    }

    const promise: Promise<void> = new Promise((resolve, reject): void => {
      const element: HTMLScriptElement | HTMLLinkElement =
        type === 'script' ? document.createElement('script') : document.createElement('link');

      if (type === 'script') {
        (element as HTMLScriptElement).src = resourceUrl;
      } else {
        (element as HTMLLinkElement).href = resourceUrl;
        (element as HTMLLinkElement).rel = 'stylesheet';
      }

      Object.assign(element, options);

      const timer: ReturnType<typeof setTimeout> = setTimeout((): void => {
        reject(new Error(`Resource load timeout: ${resourceUrl}`));
      }, timeout);

      element.onload = (): void => {
        clearTimeout(timer);
        ResourceInjector.loadedResources.set(resourceUrl, promise);
        resolve();
      };

      element.onerror = (): void => {
        clearTimeout(timer);
        ResourceInjector.loadedResources.delete(resourceUrl);
        reject(new Error(`Failed to load resource: ${resourceUrl}`));
      };

      if (type === 'script') {
        document.body.appendChild(element as HTMLScriptElement);
      } else {
        document.head.appendChild(element as HTMLLinkElement);
      }
    });

    ResourceInjector.loadedResources.set(resourceUrl, promise);

    return promise;
  }
}

export default ResourceInjector;
