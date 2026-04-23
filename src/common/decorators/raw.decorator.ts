// src/common/decorators/raw.decorator.ts
import { SetMetadata } from '@nestjs/common';
export const RAW_RESPONSE = 'raw_response';
export const Raw = () => SetMetadata(RAW_RESPONSE, true);
