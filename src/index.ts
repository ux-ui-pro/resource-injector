class ResourceInjector {
  private static loadedResources: Map<string, Promise<void>> = new Map();

  constructor() {}

  async loadScript(
    jsUrl: string,
    options: Partial<HTMLScriptElement> = {},
    timeout: number = 10000,
  ): Promise<void> {
    if (ResourceInjector.loadedResources.has(jsUrl)) {
      return ResourceInjector.loadedResources.get(jsUrl) as Promise<void>;
    }

    const promise: Promise<void> = new Promise((resolve): void => {
      const script: HTMLScriptElement = document.createElement('script');

      script.src = jsUrl;

      Object.assign(script, options);

      const timer: ReturnType<typeof setTimeout> = setTimeout((): void => {
        resolve();
      }, timeout);

      script.onload = (): void => {
        clearTimeout(timer);

        ResourceInjector.loadedResources.set(jsUrl, promise);

        resolve();
      };

      script.onerror = (): void => {
        clearTimeout(timer);

        ResourceInjector.loadedResources.delete(jsUrl);

        resolve();
      };

      document.body.appendChild(script);
    });

    ResourceInjector.loadedResources.set(jsUrl, promise);

    return promise;
  }

  async loadStyle(
    cssUrl: string,
    options: Partial<HTMLLinkElement> = {},
    timeout: number = 10000,
  ): Promise<void> {
    if (ResourceInjector.loadedResources.has(cssUrl)) {
      return ResourceInjector.loadedResources.get(cssUrl) as Promise<void>;
    }

    const promise: Promise<void> = new Promise((resolve): void => {
      const link: HTMLLinkElement = document.createElement('link');

      link.href = cssUrl;
      link.rel = 'stylesheet';

      Object.assign(link, options);

      const timer: ReturnType<typeof setTimeout> = setTimeout((): void => {
        resolve();
      }, timeout);

      link.onload = (): void => {
        clearTimeout(timer);

        ResourceInjector.loadedResources.set(cssUrl, promise);

        resolve();
      };

      link.onerror = (): void => {
        clearTimeout(timer);

        ResourceInjector.loadedResources.delete(cssUrl);

        resolve();
      };

      document.head.appendChild(link);
    });

    ResourceInjector.loadedResources.set(cssUrl, promise);

    return promise;
  }
}

export default ResourceInjector;
