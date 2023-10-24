# NestJS项目实践

## 使用环境

1. egg.js版本为`3.5.2`
2. NodeJS版本为`18.15.0`
3. npm版本为`9.5.0`
4. TypeScript版本为`4.x`

## nest/swagger

详细使用请查阅文档`nestJS`中的主题[OpenAPI (Swagger) ](https://docs.nestjs.com/openapi/introduction).

### nest/swagger中如何定义一个字段多种类型的接口?

```typescript
// 普通注册类型
export class AuthDto {
  @ApiProperty({
    description: '用户名',
    minLength: 4,
    maxLength: 20,
  })
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @ApiProperty({
    description: '密码',
  })
  password: string;
}

// 邮件注册类型
export class EmailAuthDto extends OmitType(AuthDto, ['username']) {
  @IsEmail()
  @ApiProperty({
    description: '邮箱',
  })
  email: string;
}

// 手机号注册类型
export class PhoneAuthDto extends OmitType(AuthDto, ['username']) {
  @ApiProperty({
    description: '手机号',
  })
  @IsPhoneNumber()
  phone: string;
}

@ApiExtraModels(AuthDto, EmailAuthDto, PhoneAuthDto) // oneOf 生成文档时，需要引入这三个类
// 注册接口只使用类型 RegisterDto
export class RegisterDto {
  @ApiProperty({
    description: '注册信息',
    oneOf: [
      { $ref: getSchemaPath(AuthDto) },
      { $ref: getSchemaPath(EmailAuthDto) },
      { $ref: getSchemaPath(PhoneAuthDto) },
    ],
  })
  auth: AuthDto | EmailAuthDto | PhoneAuthDto;

  @ApiProperty({
    description: '注册方式',
    enum: RegisterEnum,
  })
  type: RegisterEnum;
}
```

注册接口只使用类型` RegisterDto`,其中`RegisterDto`中的`auth`字段包含着可能是`AuthDto,EmailAuthDto ,PhoneAuthDto`中的一种类型对象,我们需在`@ApiProperty`中使用`oneOf`字段进行定义,同时还要注意:

1. `$re`f和`getSchemaPath(TheClass)`配套使用
2. `@ApiExtraModels(class1[ class2 class3 ...])`需要引入注册相关类
3. 类似的还有[oneOf, anyOf, allOf](https://docs.nestjs.com/openapi/types-and-parameters#oneof-anyof-allof)

### nest/swagger中如何对一个字段可能得多种类型进行参数校验?

原因为`nest/swagger`无法对嵌套结构中的类型进行校验,所以目前我采用的较好方式为下方法的手动校验.

```typescript
// 沿用上例类型
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
// ...
@Post('register')
async register(registerDto: RegisterDto) {
    let errors: ValidationError[] = [];
    switch (registerDto.type) {
      case RegisterEnum.NORMAL:
        auth = plainToClass(AuthDto, registerDto.auth);
        errors = await validate(auth);
        console.log(auth, errors);
        if (errors.length) {
          throw new Error(
            errors
              .map((error) => {
                return Object.values(error.constraints).join(',');
              })
              .join('\n'),
          );
        }
        return 'normal';
      // ...
    }
```

使用`class-transformer`中的`plainToClass`和`class-validator`中的`validate`配套校验,如果`validate`返回了错误数组,则参数校验失败,我们按流程将校验失败结果告知用户即可.
