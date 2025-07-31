var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
let AuthController = (() => {
    let _classDecorators = [Controller('auth')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _googleAuth_decorators;
    let _googleAuthCallback_decorators;
    var AuthController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _googleAuth_decorators = [Get('google'), UseGuards(AuthGuard('google'))];
            _googleAuthCallback_decorators = [Get('google/callback'), UseGuards(AuthGuard('google'))];
            __esDecorate(this, null, _googleAuth_decorators, { kind: "method", name: "googleAuth", static: false, private: false, access: { has: obj => "googleAuth" in obj, get: obj => obj.googleAuth }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _googleAuthCallback_decorators, { kind: "method", name: "googleAuthCallback", static: false, private: false, access: { has: obj => "googleAuthCallback" in obj, get: obj => obj.googleAuthCallback }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AuthController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        authService = __runInitializers(this, _instanceExtraInitializers);
        configService;
        constructor(authService, configService) {
            this.authService = authService;
            this.configService = configService;
        }
        async googleAuth(_req) {
            // Guard redirects to Google
        }
        async googleAuthCallback(req, res) {
            try {
                // Check if Google OAuth is properly configured
                const clientID = this.configService.get('GOOGLE_CLIENT_ID');
                if (!clientID ||
                    clientID === 'your-google-client-id-here' ||
                    clientID === 'dummy-client-id') {
                    const frontendUrl = this.configService.get('FRONTEND_URL', 'http://localhost:3000');
                    return res.redirect(`${frontendUrl}/auth/signin?error=oauth_not_configured`);
                }
                // req.user contains the Google profile data from the strategy
                const { token } = await this.authService.validateOAuthLogin(req.user, 'GOOGLE');
                // Redirect to frontend with token
                const frontendUrl = this.configService.get('FRONTEND_URL', 'http://localhost:3000');
                res.redirect(`${frontendUrl}/auth/callback?token=${token}&provider=google`);
            }
            catch (error) {
                console.error('Google OAuth callback error:', error);
                // Redirect to frontend with error
                const frontendUrl = this.configService.get('FRONTEND_URL', 'http://localhost:3000');
                const errorMessage = error?.message ===
                    'Google OAuth not configured. Please run ./scripts/setup-google-oauth.sh'
                    ? 'oauth_not_configured'
                    : 'oauth_failed';
                res.redirect(`${frontendUrl}/auth/signin?error=${errorMessage}`);
            }
        }
    };
    return AuthController = _classThis;
})();
export { AuthController };
