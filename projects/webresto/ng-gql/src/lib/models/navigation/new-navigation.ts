namespace NewNavigation {
  /** Виды навигации между категориями блюд */
  export enum NavigationBehavior {
    'onepagebyquerymenu' = 'onepagebyquerymenu',
    'newpagebyquerymenu' = 'newpagebyquerymenu',
  }
  /** mnemonicId навигационных блоков */
  export enum NavigationMnemonicId {
    'footer' = 'footer',
    'social' = 'social',
    'head' = 'head',
  }
  /** Концепты меню */
  export type Concept = 'origin' | string;

  export interface Navigation {
    /** Название раздела с этим концептом */
    label: string;
    /** Дополнительное информационное сообщение */
    warning: string | null;
    /** Активен ли элемент */
    active: boolean;
    /** Концепт меню */
    concept: Concept;
    /** префикс URL-сайта для данного концепта */
    slug: string;
    /** Тип навигации между разделами категорий блюд */
    behavior: `${NavigationBehavior}`;
    /** Кортеж навигационных блоков - для хедера, футера и соц. сетей. */
    navigation: [NavigationBlock<'head'>, NavigationBlock<'social'>, NavigationBlock<'footer'>];
  }

  export interface NavigationBlock<T extends `${NavigationMnemonicId}`> {
    /** id навигационного блока */
    id: number;
    /** дополнительное описание навигационного блока */
    description: string | null;
    /** mnemonicId навигационного блока */
    mnemonicId: T;
    /** Ссылки для данного навигационного блока */
    links: NavigationBlockLink[];
  }

  /** Ссылки в навигационном блоке*/
  export interface NavigationBlockLink {
    /** Текст ссылки */
    label: string;
    /** Ссылка */
    link: string;
    /** Активна ли ссылка*/
    active: boolean;
    /** Отображать ли ссылку */
    visible: boolean;
    /** id иконки для ссылки */
    icon?: string | null;
  }
}
