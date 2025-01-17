import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { NzButtonType } from 'ng-zorro-antd/button';
import { Subject, Subscription } from 'rxjs';

export default interface ActionButton {
    label: string,
    onClick?: (event: Event) => void,
    disabled?: boolean,
    class?: string,
    nzType: NzButtonType
}

@Injectable({
    providedIn: 'root',
})
export class ToolbarService {
    onChangeIsVisible: Subject<boolean> = new Subject()
    onChangeActionButtons: Subject<ActionButton[]> = new Subject()

    private subscription: Subscription;

    constructor(private router: Router) {
        this.subscription = this.router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                this.close();
            }
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    show(actionButtons?: ActionButton[]) {
        this.onChangeIsVisible.next(true)
        this.onChangeActionButtons.next(actionButtons ?? [])
    }

    close() {
        this.onChangeIsVisible.next(false)
    }


}
