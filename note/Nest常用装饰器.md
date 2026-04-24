# Nest 常用装饰器

这篇笔记整理了 Nest 中最常见的一批装饰器，按职责分组，便于记忆和查阅。

## 1. 模块与依赖注入

### `@Module()`

声明一个 Nest 模块，用于组织当前模块的：

- `imports`
- `controllers`
- `providers`
- `exports`

```ts
@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
```

### `@Controller()`

声明控制器，用来处理路由请求。

```ts
@Controller('user')
export class UserController {}
```

### `@Injectable()`

声明一个类可以作为 provider，被 Nest 的 IoC 容器托管，并可被注入。

```ts
@Injectable()
export class UserService {}
```

### `@Inject()`

通过 token 手动指定注入的 provider。token 可以是：

- class
- string
- symbol

```ts
constructor(@Inject('CONFIG') private config: Record<string, any>) {}
```

### `@Optional()`

声明注入项是可选的。如果容器里没有对应 provider，不会报错，而是注入 `undefined`。

```ts
constructor(@Optional() @Inject('CACHE') private cache?: any) {}
```

### `@Global()`

声明全局模块。该模块导出的 provider 可以在其他模块中直接使用，而无需重复 `imports`。

```ts
@Global()
@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
```

## 2. 异常、管道、拦截器

### `@Catch()`

声明异常过滤器处理哪些异常类型。

```ts
@Catch(HttpException)
export class HttpExceptionFilter {}
```

### `@UseFilters()`

在类级别或方法级别使用异常过滤器。

```ts
@UseFilters(HttpExceptionFilter)
@Get()
findAll() {}
```

### `@UsePipes()`

在类级别或方法级别使用管道，常用于参数转换和校验。

```ts
@UsePipes(ValidationPipe)
@Post()
create() {}
```

### `@UseInterceptors()`

在类级别或方法级别使用拦截器。

```ts
@UseInterceptors(LoggingInterceptor)
@Get()
findAll() {}
```

### `@UseGuards()`

虽然你前一版没写到，但这是非常常用的装饰器，用于类级别或方法级别应用守卫。

```ts
@UseGuards(AuthGuard)
@Get('profile')
getProfile() {}
```

## 3. 元数据

### `@SetMetadata()`

在类或方法上添加自定义 metadata，通常配合 guard 做权限控制。

```ts
@SetMetadata('roles', ['admin'])
@Get('admin')
getAdminData() {}
```

## 4. 路由方法装饰器

用于声明处理哪种 HTTP 请求方式：

- `@Get()`
- `@Post()`
- `@Put()`
- `@Delete()`
- `@Patch()`
- `@Options()`
- `@Head()`

```ts
@Get()
findAll() {}

@Post()
create() {}
```

## 5. 请求参数提取

### `@Param()`

提取路径参数。

例如 `/user/:id` 中的 `id`：

```ts
@Get(':id')
findById(@Param('id') id: string) {
  return id
}
```

### `@Query()`

提取 query 参数。

例如 `/user?name=jack` 中的 `name`：

```ts
@Get()
find(@Query('name') name: string) {
  return name
}
```

### `@Body()`

提取请求体，通常配合 DTO 使用。

```ts
@Post()
create(@Body() dto: CreateUserDto) {
  return dto
}
```

### `@Headers()`

提取某个请求头，或者全部请求头。

```ts
@Get()
findAll(@Headers('authorization') token: string) {
  return token
}
```

### `@Session()`

提取 session 对象，前提是启用了 `express-session` 中间件。

```ts
@Get('session')
getSession(@Session() session: Record<string, any>) {
  return session
}
```

### `@HostParam()`

提取 host 中的参数。

注意：正确拼写是 `@HostParam()`，不是 `@HostParm()`。

```ts
@Controller({ host: ':account.example.com' })
export class AccountController {
  @Get()
  getInfo(@HostParam('account') account: string) {
    return account
  }
}
```

## 6. 原生请求与响应对象

### `@Req()` / `@Request()`

注入原生 request 对象。

```ts
@Get()
findAll(@Req() req: Request) {
  return req.url
}
```

### `@Res()` / `@Response()`

注入原生 response 对象。

需要注意的是：一旦使用了 `@Res()`，Nest 默认不会再自动把返回值作为响应内容处理，除非设置 `passthrough: true`。

```ts
@Get()
findAll(@Res({ passthrough: true }) res: Response) {
  res.setHeader('x-demo', '1')
  return { ok: true }
}
```

### `@Next()`

注入 `next` 方法，常用于兼容 Express 风格处理流程。

```ts
@Get()
findAll(@Next() next: NextFunction) {
  next()
}
```

## 7. 响应控制

### `@HttpCode()`

修改响应状态码。

```ts
@Post()
@HttpCode(204)
create() {}
```

### `@Header()`

设置响应头。

```ts
@Get()
@Header('Cache-Control', 'no-store')
findAll() {}
```

### `@Redirect()`

指定重定向地址。

```ts
@Get('docs')
@Redirect('https://docs.nestjs.com', 302)
goDocs() {}
```

### `@Render()`

指定模板引擎渲染页面。

```ts
@Get()
@Render('index')
index() {
  return { title: 'Nest App' }
}
```

## 8. 记忆方式

可以按这几类记：

- 组织结构：`@Module`、`@Controller`、`@Injectable`、`@Global`
- 依赖注入：`@Inject`、`@Optional`
- 请求处理：`@Get`、`@Post`、`@Put`、`@Delete`
- 参数提取：`@Param`、`@Query`、`@Body`、`@Headers`、`@Req`、`@Res`
- 请求增强：`@UseGuards`、`@UsePipes`、`@UseFilters`、`@UseInterceptors`
- 响应控制：`@HttpCode`、`@Header`、`@Redirect`、`@Render`

## 9. 补充说明

1. `@Controller()`、`@UseFilters()`、`@UsePipes()`、`@UseInterceptors()`、`@UseGuards()`、`@SetMetadata()` 都支持类级别和方法级别使用。
2. `@Body()`、`@Param()`、`@Query()` 通常会和 DTO、`ValidationPipe` 一起配合使用。
3. `@Res()` 虽然灵活，但不建议滥用，否则容易绕开 Nest 的统一响应处理机制。
