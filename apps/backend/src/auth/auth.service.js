var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
let AuthService = (() => {
    let _classDecorators = [Injectable()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AuthService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AuthService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        usersService;
        jwtService;
        constructor(usersService, jwtService) {
            this.usersService = usersService;
            this.jwtService = jwtService;
        }
        async signUp(input) {
            const hashedPassword = await bcrypt.hash(input.password, 10);
            const user = await this.usersService.create({
                ...input,
                password: hashedPassword,
            });
            const token = this.jwtService.sign({ userId: user.id });
            return {
                token,
                user,
            };
        }
        async signIn(input) {
            const user = await this.usersService.findByEmail(input.email);
            if (!user) {
                throw new UnauthorizedException('Invalid credentials');
            }
            const isPasswordValid = await bcrypt.compare(input.password, user.password);
            if (!isPasswordValid) {
                throw new UnauthorizedException('Invalid credentials');
            }
            const token = this.jwtService.sign({ userId: user.id });
            return {
                token,
                user,
            };
        }
        async validateUser(userId) {
            return this.usersService.findById(userId);
        }
        async validateOAuthLogin(profile, provider) {
            const { email, googleId, name } = profile;
            // Check if user exists with this Google ID
            let user = await this.usersService.findByGoogleId(googleId);
            if (!user) {
                // Check if user exists with this email
                user = await this.usersService.findByEmail(email);
                if (user) {
                    // User exists with email but not linked to Google, link it
                    user = await this.usersService.update(user.id, {
                        googleId,
                        provider,
                    });
                }
                else {
                    // Create new user
                    user = await this.usersService.createOAuthUser({
                        email,
                        googleId,
                        name,
                        provider,
                    });
                }
            }
            const token = this.jwtService.sign({ userId: user.id });
            return {
                token,
                user,
            };
        }
    };
    return AuthService = _classThis;
})();
export { AuthService };
