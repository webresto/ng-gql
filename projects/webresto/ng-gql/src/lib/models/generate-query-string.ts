export type VCriteria = {
  criteria: {
    [ key: string ]: any;
  };
};

type FieldTypes = Object | number | bigint | Symbol | string | boolean;

export function generateQueryString<T, N extends `${ string }`, V> ( options: {
  name: N,
  queryObject: T,
  variables: V,
} ) {
  const { name, queryObject, variables } = options;
  const makeFieldList = <T, V> ( source: T, name: string, indent: number = 1, variables?: V ): string => {
    const indentString = new Array<string>( indent * 2 ).fill( ' ' ).join( '' );
    return `${ name }${ indent === 1 && variables ? `(${ ( <( keyof V )[]> Object.keys( variables ) ).map(
      key => `${ key }:$${ key }`
    ).join( ',' )
      })` : '' } {\n  ${ indentString }${ Object.entries( source ).
        filter(
          ( entry ): entry is [ string, FieldTypes ] => typeof entry[ 1 ] !== 'function'
        ).
        map(
          entry => typeof entry[ 1 ] === 'object' && entry[ 1 ] !== undefined && entry[ 1 ] !== null ?
            makeFieldList(
              Array.isArray( entry[ 1 ] ) && entry[ 1 ][ 0 ] ? entry[ 1 ][ 0 ] : entry[ 1 ], entry[ 0 ], indent + 1
            ) :
            typeof entry[ 1 ] === 'string' && entry[ 1 ].includes( 'Fragment' ) ?
              `${ entry[ 0 ] } : {...${ entry[ 1 ] }}` :
              String( entry[ 0 ] )
        ).join(
          `,\n  ${ indentString }`
        )
      }\n${ indentString }}
      `;
  };
  const getGqlType = ( value: FieldTypes ): string => {
    switch ( typeof value ) {
      case 'number': return 'Int';
      case 'string': return 'String';
      case 'boolean': return 'Boolean';
      case 'object': return 'Json';
      default: throw new Error( 'Параметр должен принадлежать типам number, string, object или boolean' );
    }
  };
  return ` load${ name[ 0 ].toUpperCase() + name.slice( 1 ) } ${ variables ? `(${ ( <( keyof V )[]> Object.keys( variables ) ).map(
    key => `$${ key }:${ getGqlType( variables[ key ] ) }`
  ).join( ',' )
    })` : '' } {\n${ makeFieldList( queryObject, name, 1, variables ) }\n}`;
}