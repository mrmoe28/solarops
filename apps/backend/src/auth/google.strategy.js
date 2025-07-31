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
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
let GoogleStrategy = (() => {
    let _classDecorators = [Injectable()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = PassportStrategy(Strategy, 'google');
    var GoogleStrategy = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            GoogleStrategy = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        configService;
        constructor(configService) {
            const clientID = configService.get('GOOGLE_CLIENT_ID');
            const clientSecret = configService.get('GOOGLE_CLIENT_SECRET');
            // Use actual credentials if available, otherwise use dummy values
            const finalClientID = !clientID || clientID === 'your-google-client-id-here' ? 'dummy-client-id' : clientID;
            const finalClientSecret = !clientSecret || clientSecret === 'your-google-client-secret-here'
                ? 'dummy-client-secret'
                : clientSecret;
            if (finalClientID === 'dummy-client-id') {
                console.warn('⚠️  Google OAuth not configured. Run ./scripts/setup-google-oauth.sh to set up Google OAuth.');
            }
            super({
                clientID: finalClientID,
                clientSecret: finalClientSecret,
                callbackURL: configService.get('GOOGLE_CALLBACK_URL', 'http://localhost:4000/auth/google/callback'),
                scope: ['email', 'profile'],
            });
            this.configService = configService;
        }
        async validate(accessToken, refreshToken, profile, done) {
            // Check if using dummy credentials
            const clientID = this.configService.get('GOOGLE_CLIENT_ID');
            if (!clientID || clientID === 'your-google-client-id-here' || clientID === 'dummy-client-id') {
                return done(new Error('Google OAuth not configured. Please run ./scripts/setup-google-oauth.sh'), null);
            }
            const { name, emails, photos, id } = profile;
            const user = {
                googleId: id,
                email: emails[0].value,
                firstName: name.givenName,
                lastName: name.familyName,
                name: name.givenName + ' ' + name.familyName,
                picture: photos[0].value,
                accessToken,
            };
            done(null, user);
        }
    };
    return GoogleStrategy = _classThis;
})();
export { GoogleStrategy };
