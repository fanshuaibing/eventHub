const EventHub = {
  cache: {},
  on(eventName: string, fn: EventHubFn) {
    this.cache[eventName] = this.cache[eventName] || [];
    this.cache[eventName].push(fn);
  },
  emit(eventName: string, data?: unknown) {
    (this.cache[eventName] || []).forEach((fn) => {
      fn(data);
    });
  },
  off(eventName: string, fn: EventHubFn) {
    this.cache[eventName] = this.cache[eventName] || [];
    let index = indexOf(this.cache[eventName], fn);
    console.log(index);
    if (index === -1) {
      return;
    }
    this.cache[eventName].splice(index, 1);
  },
};

interface EventHubFn {
  (data: unknown): void;
}

function indexOf(arr, fn) {
  let index = -1;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === fn) {
      index = i;
      break;
    }
  }
  return index;
}

export default EventHub;
