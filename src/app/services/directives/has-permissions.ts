import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";
import { AuthService } from "../auth/auth.service";

@Directive({
    selector: '[hasPermission]',
    standalone: true
})
export class HasPermissionDirective {
    private hasView = false;

    constructor(
        private authService: AuthService,
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef
    ) {}

    @Input() set hasPermission(permission: string) {
        if (this._permission === permission) return; // Ignore les mises à jour identiques
        this._permission = permission;

        const hasPermission = this.authService.hasPermission(permission); // Appel unique
        if (hasPermission && !this.hasView) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.hasView = true;
        } else if (!hasPermission && this.hasView) {
            this.viewContainer.clear();
            this.hasView = false;
        }
    }

    private _permission: string | undefined;
}