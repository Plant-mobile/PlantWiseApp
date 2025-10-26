import { SetMetadata } from "@nestjs/common";

// ✅ غيّر من roles إلى isAdmin
export const Roles = (isAdmin: boolean) => SetMetadata('isAdmin', isAdmin);
