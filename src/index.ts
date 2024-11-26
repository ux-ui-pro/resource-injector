class ResourceInjector {
  private static loadedResources: Map<string, Promise<void>> = new Map();

  constructor() {}

  async loadResource(config: {
    url: string;
    type: 'script' | 'style';
    options?: Partial<HTMLScriptElement | HTMLLinkElement>;
    timeout?: number;
    forceReload?: boolean;
  }): Promise<void> {
    const { url, type, options = {}, timeout = 10000, forceReload = false } = config;

    if (!forceReload && ResourceInjector.loadedResources.has(url)) {
      return ResourceInjector.loadedResources.get(url) as Promise<void>;
    }

    const promise: Promise<void> = new Promise((resolve): void => {
      const element: HTMLScriptElement | HTMLLinkElement =
        type === 'script' ? document.createElement('script') : document.createElement('link');

      if (type === 'script') {
        (element as HTMLScriptElement).src = url;
      } else {
        (element as HTMLLinkElement).href = url;
        (element as HTMLLinkElement).rel = 'stylesheet';
      }

      Object.assign(element, options);

      const timer: ReturnType<typeof setTimeout> = setTimeout((): void => {
        resolve();
      }, timeout);

      element.onload = (): void => {
        clearTimeout(timer);

        ResourceInjector.loadedResources.set(url, promise);

        resolve();
      };

      element.onerror = (): void => {
        clearTimeout(timer);

        ResourceInjector.loadedResources.delete(url);

        resolve();
      };

      if (type === 'script') {
        document.body.appendChild(element as HTMLScriptElement);
      } else {
        document.head.appendChild(element as HTMLLinkElement);
      }
    });

    ResourceInjector.loadedResources.set(url, promise);

    return promise;
  }
}

export default ResourceInjector;
