---
title: 'TypeScript Genericsの基礎から応用まで'
description: 'TypeScriptのGenericsを理解して、型安全で再利用可能なコードを書こう。'
date: '2024-01-20'
tags: ['TypeScript', 'JavaScript', 'Programming']
category: 'Technology'
author: 'tsuka-ryu'
published: true
featured: false
slug: 'typescript-generics-guide'
---

# TypeScript Genericsの基礎から応用まで

TypeScriptのGenericsは、型安全性を保ちながら再利用可能なコードを書くための重要な機能です。基礎から応用まで詳しく解説します。

## Genericsとは

Genericsは、型を引数として受け取ることができる機能です。これにより、具体的な型を指定せずに、様々な型で動作するコードを書くことができます。

### 基本的な書き方

```typescript
// 基本的なGeneric関数
function identity<T>(arg: T): T {
  return arg;
}

// 使用例
const stringResult = identity<string>('Hello'); // string型
const numberResult = identity<number>(42); // number型
const boolResult = identity(true); // 型推論でboolean型
```

## Generic関数

### 複数の型引数

```typescript
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const result = pair<string, number>('hello', 42); // [string, number]
```

### 制約付きGenerics

```typescript
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length); // lengthプロパティがあることが保証される
  return arg;
}

logLength('Hello'); // ✅ string has length
logLength([1, 2, 3]); // ✅ array has length
// logLength(42); // ❌ number doesn't have length
```

## Genericインターフェース

### APIレスポンスの型定義

```typescript
interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

// 使用例
const userResponse: ApiResponse<User> = {
  data: { id: 1, name: 'John', email: 'john@example.com' },
  status: 200,
};

const usersResponse: ApiResponse<User[]> = {
  data: [
    { id: 1, name: 'John', email: 'john@example.com' },
    { id: 2, name: 'Jane', email: 'jane@example.com' },
  ],
  status: 200,
};
```

### Repository パターン

```typescript
interface Repository<T> {
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  create(entity: Omit<T, 'id'>): Promise<T>;
  update(id: string, entity: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}

class UserRepository implements Repository<User> {
  async findById(id: string): Promise<User | null> {
    // 実装
    return null;
  }

  async findAll(): Promise<User[]> {
    // 実装
    return [];
  }

  async create(userData: Omit<User, 'id'>): Promise<User> {
    // 実装
    return { id: 1, ...userData };
  }

  async update(id: string, userData: Partial<User>): Promise<User> {
    // 実装
    return { id: 1, name: '', email: '', ...userData };
  }

  async delete(id: string): Promise<void> {
    // 実装
  }
}
```

## Genericクラス

### ジェネリックなコレクションクラス

```typescript
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }
}

// 使用例
const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
console.log(numberStack.pop()); // 2

const stringStack = new Stack<string>();
stringStack.push('hello');
stringStack.push('world');
```

## 条件付き型

### 基本的な条件付き型

```typescript
type IsArray<T> = T extends any[] ? true : false;

type Test1 = IsArray<string[]>; // true
type Test2 = IsArray<number>; // false
```

### 実用的な条件付き型

```typescript
type ApiResult<T> = T extends string
  ? { message: T }
  : T extends number
    ? { code: T }
    : T extends boolean
      ? { success: T }
      : { data: T };

type StringResult = ApiResult<string>; // { message: string }
type NumberResult = ApiResult<number>; // { code: number }
type BooleanResult = ApiResult<boolean>; // { success: boolean }
type ObjectResult = ApiResult<User>; // { data: User }
```

## Mapped Types

### 基本的なMapped Types

```typescript
type Optional<T> = {
  [P in keyof T]?: T[P];
};

type RequiredUser = {
  id: number;
  name: string;
  email: string;
};

type OptionalUser = Optional<RequiredUser>;
// {
//   id?: number;
//   name?: string;
//   email?: string;
// }
```

### 条件付きMapped Types

```typescript
type NonNullable<T> = {
  [P in keyof T]: T[P] extends null | undefined ? never : T[P];
};

type NullableUser = {
  id: number | null;
  name: string | undefined;
  email: string;
};

type CleanUser = NonNullable<NullableUser>;
// {
//   id: never;
//   name: never;
//   email: string;
// }
```

## Utility Types

### よく使用されるUtility Types

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Partial - すべてのプロパティをオプショナルに
type PartialUser = Partial<User>;

// Required - すべてのプロパティを必須に
type RequiredUser = Required<PartialUser>;

// Pick - 指定したプロパティのみを選択
type UserSummary = Pick<User, 'id' | 'name'>;

// Omit - 指定したプロパティを除外
type CreateUser = Omit<User, 'id'>;

// Record - キーと値の型を指定
type UserRoles = Record<string, 'admin' | 'user' | 'guest'>;
```

## 実践的な例

### 型安全なEvent Emitter

```typescript
interface EventMap {
  'user:login': { userId: string; timestamp: Date };
  'user:logout': { userId: string };
  'data:update': { id: string; data: any };
}

class TypedEventEmitter<T extends Record<string, any>> {
  private listeners: {
    [K in keyof T]?: Array<(payload: T[K]) => void>;
  } = {};

  on<K extends keyof T>(event: K, listener: (payload: T[K]) => void): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(listener);
  }

  emit<K extends keyof T>(event: K, payload: T[K]): void {
    const eventListeners = this.listeners[event];
    if (eventListeners) {
      eventListeners.forEach(listener => listener(payload));
    }
  }

  off<K extends keyof T>(event: K, listener: (payload: T[K]) => void): void {
    const eventListeners = this.listeners[event];
    if (eventListeners) {
      const index = eventListeners.indexOf(listener);
      if (index > -1) {
        eventListeners.splice(index, 1);
      }
    }
  }
}

// 使用例
const emitter = new TypedEventEmitter<EventMap>();

emitter.on('user:login', payload => {
  // payloadは自動的に{ userId: string; timestamp: Date }型
  console.log(`User ${payload.userId} logged in at ${payload.timestamp}`);
});

emitter.emit('user:login', {
  userId: 'user123',
  timestamp: new Date(),
});
```

### APIクライアントの型定義

```typescript
interface ApiEndpoints {
  '/users': {
    GET: { response: User[] };
    POST: { body: CreateUser; response: User };
  };
  '/users/:id': {
    GET: { params: { id: string }; response: User };
    PUT: { params: { id: string }; body: Partial<User>; response: User };
    DELETE: { params: { id: string }; response: void };
  };
}

class ApiClient {
  async request<Path extends keyof ApiEndpoints, Method extends keyof ApiEndpoints[Path]>(
    path: Path,
    method: Method,
    options?: ApiEndpoints[Path][Method] extends { body: any }
      ? { body: ApiEndpoints[Path][Method]['body'] }
      : never
  ): Promise<ApiEndpoints[Path][Method]['response']> {
    // 実装
    throw new Error('Not implemented');
  }
}

// 使用例
const client = new ApiClient();

// 型安全なAPIコール
const users = await client.request('/users', 'GET');
const newUser = await client.request('/users', 'POST', {
  body: { name: 'John', email: 'john@example.com', age: 30 },
});
```

## パフォーマンスと最適化

### 型レベルでの最適化

```typescript
// 遅い：毎回評価される
type SlowConditional<T> = T extends string ? true : false;

// 速い：事前に計算された型を使用
type FastCheck<T> = T extends string
  ? true
  : T extends number
    ? false
    : T extends boolean
      ? false
      : never;
```

## まとめ

TypeScript Genericsを効果的に使用するためのポイント：

1. **基本概念の理解**: 型引数と型安全性の関係
2. **制約の活用**: `extends`を使った型制約で安全性を向上
3. **実用的なパターン**: Repository、Event Emitter、APIクライアントなど
4. **Utility Typesの活用**: 標準のUtility Typesを理解し活用
5. **パフォーマンス**: 型レベルでの最適化を意識

Genericsを使いこなすことで、型安全性を保ちながら再利用可能で保守性の高いコードを書くことができます。
