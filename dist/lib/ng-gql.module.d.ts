import { ModuleWithProviders } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
export interface NgGqlConfig {
    url: string;
}
export declare class NgGqlModule {
    constructor(apollo: Apollo, httpLink: HttpLink, config: NgGqlConfig);
    static forRoot(config: NgGqlConfig): ModuleWithProviders<NgGqlModule>;
}
