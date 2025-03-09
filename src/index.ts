interface LoadResourceConfig {
  url: string;
  type: 'script' | 'style';
  options?: Partial<HTMLScriptElement> | Partial<HTMLLinkElement>;
  timeout?: number;
  forceReload?: boolean;
  appendTimestamp?: boolean;
}

class ResourceInjector {
  private static loadedResources = new Map<string, Promise<void>>();

  public async loadResource(config: LoadResourceConfig): Promise<void> {
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
      return ResourceInjector.loadedResources.get(resourceUrl)!;
    }

    if (forceReload) {
      this.removeExistingResource(url, type);

      ResourceInjector.loadedResources.delete(resourceUrl);
    }

    const promise = new Promise<void>((resolve, reject): void => {
      const element = this.createResourceElement(type, resourceUrl, options);

      const timerId = setTimeout((): void => {
        reject(new Error(`Resource load timeout: ${resourceUrl}`));
      }, timeout);

      element.onload = (): void => {
        clearTimeout(timerId);

        ResourceInjector.loadedResources.set(resourceUrl, promise);

        resolve();
      };

      element.onerror = (): void => {
        clearTimeout(timerId);

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

  private removeExistingResource(url: string, type: 'script' | 'style'): void {
    const selector = type === 'script' ? `script[src="${url}"]` : `link[href="${url}"]`;
    const existingElement = document.querySelector(selector);

    if (existingElement) {
      existingElement.remove();
    }
  }

  private createResourceElement(
    type: 'script' | 'style',
    resourceUrl: string,
    options: Partial<HTMLScriptElement> | Partial<HTMLLinkElement>,
  ): HTMLScriptElement | HTMLLinkElement {
    let element: HTMLScriptElement | HTMLLinkElement;

    if (type === 'script') {
      element = document.createElement('script');
      element.src = resourceUrl;
    } else {
      element = document.createElement('link');
      element.href = resourceUrl;
      element.rel = 'stylesheet';
    }

    Object.assign(element, options);

    return element;
  }
}

export default ResourceInjector;
