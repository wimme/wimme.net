import { ApplicationRef, createComponent, EnvironmentInjector, Injectable } from '@angular/core';
import { PopupComponent } from '../components/popup/popup.component';
import { ImageItem } from '../interfaces/imageitem';

@Injectable({
    providedIn: 'root'
})
export class PopupService {
    constructor(
        private injector: EnvironmentInjector,
        private applicationRef: ApplicationRef
    ) { }

    public show(caption: string, image: string) {
        // Create element
        const popup = document.createElement('popup-component');

        // Create the component and wire it up with the element
        const popupComponentRef = createComponent(PopupComponent, { environmentInjector: this.injector, hostElement: popup });

        // Attach to the view so that the change detector knows to run
        this.applicationRef.attachView(popupComponentRef.hostView);

        // Listen to the close event
        const subscription = popupComponentRef.instance.closed.subscribe(() => {
            subscription.unsubscribe();
            document.body.removeChild(popup);
            document.documentElement.classList.remove('popup-open');
            this.applicationRef.detachView(popupComponentRef.hostView);
        });

        // Find all images
        const images: ImageItem[] = [];
        const imageElements = document.body.getElementsByTagName('image-element');
        for (let i = 0; i <= imageElements.length; i++) {
            const one = imageElements.item(i);
            const src = one?.getAttribute('src');
            if (src) {
                images.push({
                    src: src,
                    caption: one?.getAttribute('caption') || ''
                });
            }
        }

        // Set the content
        popupComponentRef.instance.caption = caption;
        popupComponentRef.instance.image = image;
        popupComponentRef.instance.images = images;

        // Add to the DOM
        document.body.appendChild(popup);
        document.documentElement.classList.add('popup-open');
    }

}
