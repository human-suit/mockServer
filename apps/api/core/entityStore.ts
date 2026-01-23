// core/entityStore.ts
import { v4 as uuid } from "uuid";

export interface BaseEntity {
  id: string; // UUID
}

export class UuidEntityStore<T extends BaseEntity> {
  private items: T[];

  constructor(initialData: T[] = []) {
    this.items = [...initialData];
  }

  findAll(): T[] {
    return [...this.items];
  }

  findById(id: string): T | undefined {
    return this.items.find((item) => item.id === id);
  }

  create(data: Omit<T, "id">): T {
    const newItem: T = {
      ...data,
      id: uuid(),
    } as T;
    this.items.push(newItem);
    return newItem;
  }

  update(id: string, data: Partial<Omit<T, "id">>): T | undefined {
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) return undefined;

    const updated: T = { ...this.items[index], ...data };
    this.items[index] = updated;
    return updated;
  }

  delete(id: string): boolean {
    const before = this.items.length;
    this.items = this.items.filter((item) => item.id !== id);
    return this.items.length < before;
  }
}
