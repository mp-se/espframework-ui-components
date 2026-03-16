import { ref, onBeforeUnmount, Ref } from 'vue';
import { logDebug, logError } from '../modules/logger';

export interface UseFetchReturn {
  managedFetch: (url: string, options?: RequestInit) => Promise<Response | null>;
  abortAllRequests: () => void;
  abortRequest: (controller: AbortController) => void;
  activeControllers: Ref<Set<AbortController>>;
}

export function useFetch(): UseFetchReturn {
  const controllers: Ref<Set<AbortController>> = ref(new Set());

  const managedFetch = async (url: string, options: RequestInit = {}): Promise<Response | null> => {
    const controller = new AbortController();
    controllers.value.add(controller);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      controllers.value.delete(controller);
      return response;
    } catch (error: unknown) {
      controllers.value.delete(controller);

      if (error instanceof Error && error.name === 'AbortError') {
        logDebug('useFetch.managedFetch()', 'Request aborted:', url);
        return null;
      }

      logError('useFetch.managedFetch()', 'Fetch error:', error);
      throw error;
    }
  };

  const abortAllRequests = (): void => {
    controllers.value.forEach(controller => {
      controller.abort();
    });
    controllers.value.clear();
    logDebug('useFetch.abortAllRequests()', 'All fetch requests aborted');
  };

  const abortRequest = (controller: AbortController): void => {
    if (controllers.value.has(controller)) {
      controller.abort();
      controllers.value.delete(controller);
    }
  };

  onBeforeUnmount(() => {
    abortAllRequests();
  });

  if (typeof window !== 'undefined') {
    const handleUnload = (): void => {
      abortAllRequests();
    };

    window.addEventListener('beforeunload', handleUnload);

    onBeforeUnmount(() => {
      window.removeEventListener('beforeunload', handleUnload);
    });
  }

  return {
    managedFetch,
    abortAllRequests,
    abortRequest,
    activeControllers: controllers,
  };
}
