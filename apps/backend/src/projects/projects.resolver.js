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
import { Resolver, Query, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Project } from './models/project.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
let ProjectsResolver = (() => {
    let _classDecorators = [Resolver(() => Project), UseGuards(JwtAuthGuard)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _projects_decorators;
    let _project_decorators;
    let _createProject_decorators;
    let _updateProject_decorators;
    let _deleteProject_decorators;
    let _generateProposalDownload_decorators;
    var ProjectsResolver = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _projects_decorators = [Query(() => [Project])];
            _project_decorators = [Query(() => Project, { nullable: true })];
            _createProject_decorators = [Mutation(() => Project)];
            _updateProject_decorators = [Mutation(() => Project)];
            _deleteProject_decorators = [Mutation(() => Boolean)];
            _generateProposalDownload_decorators = [Mutation(() => String)];
            __esDecorate(this, null, _projects_decorators, { kind: "method", name: "projects", static: false, private: false, access: { has: obj => "projects" in obj, get: obj => obj.projects }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _project_decorators, { kind: "method", name: "project", static: false, private: false, access: { has: obj => "project" in obj, get: obj => obj.project }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _createProject_decorators, { kind: "method", name: "createProject", static: false, private: false, access: { has: obj => "createProject" in obj, get: obj => obj.createProject }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _updateProject_decorators, { kind: "method", name: "updateProject", static: false, private: false, access: { has: obj => "updateProject" in obj, get: obj => obj.updateProject }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _deleteProject_decorators, { kind: "method", name: "deleteProject", static: false, private: false, access: { has: obj => "deleteProject" in obj, get: obj => obj.deleteProject }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _generateProposalDownload_decorators, { kind: "method", name: "generateProposalDownload", static: false, private: false, access: { has: obj => "generateProposalDownload" in obj, get: obj => obj.generateProposalDownload }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ProjectsResolver = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        projectsService = __runInitializers(this, _instanceExtraInitializers);
        constructor(projectsService) {
            this.projectsService = projectsService;
        }
        async projects(user) {
            return this.projectsService.findAll(user.id);
        }
        async project(id, user) {
            return this.projectsService.findOne(id, user.id);
        }
        async createProject(input, user) {
            return this.projectsService.create(user.id, input);
        }
        async updateProject(id, input, user) {
            return this.projectsService.update(id, user.id, input);
        }
        async deleteProject(id, user) {
            const result = await this.projectsService.delete(id, user.id);
            return result.count > 0;
        }
        async generateProposalDownload(id, user) {
            return this.projectsService.generateProposalDownload(id, user.id);
        }
    };
    return ProjectsResolver = _classThis;
})();
export { ProjectsResolver };
