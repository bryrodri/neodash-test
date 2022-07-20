export const texto = {
  title: "Logyca",
  version: "2.1",
  settings: {
    pagenumber: 0,
    editable: true,
    fullscreenEnabled: false,
    downloadImageEnabled: false,
    parameters: {
      neodash_punto_venta_nombre: "BUGA CENTRO",
      neodash_categoria_nombre: "FRUTAS A GRANEL",
      neodash_municipio_nombre: "Cali",
      neodash_n2_nombre_comercial: "",
      neodash_n1_nombre: "",
    },
  },
  pages: [
    {
      title: "Productos más vendidos",
      reports: [
        {
          title: "Categoría",
          query:
            "MATCH (n:`n1`) \nWHERE toLower(toString(n.`nombre`)) CONTAINS toLower($input) \nRETURN DISTINCT n.`nombre` as value LIMIT 5",
          width: 4,
          height: 1,
          x: 0,
          y: 0,
          type: "select",
          selection: {},
          settings: {
            type: "Node Property",
            entityType: "n1",
            propertyType: "nombre",
            parameterName: "neodash_n1_nombre",
          },
        },
        {
          title: "Gráfico de barras",
          query:
            'MATCH (cd:control_diario)-[:GESTIONA]->(p:producto)<-[:CLASIFICA]-(c:n3)\nWHERE c.nombre = $neodash_n3_nombre\nRETURN sum(toInteger(replace(cd.unidades_vendidas,".",""))) AS `U. vendidas`, p.descripcion \nORDER BY `U. vendidas` DESC LIMIT 10\n\n\n',
          width: 9,
          height: 2,
          x: 0,
          y: 1,
          type: "bar",
          selection: {
            index: "p.descripcion",
            value: "U. vendidas",
            key: "(none)",
          },
          settings: {
            marginBottom: 100,
            marginLeft: 80,
            hideSelections: true,
          },
        },
        {
          title: "Gráfico de torta",
          query:
            'MATCH (cd:control_diario)-[:GESTIONA]->(p:producto)<-[:CLASIFICA]-(c:n3)\nWHERE c.nombre = $neodash_n3_nombre\nRETURN sum(toInteger(replace(cd.unidades_vendidas,".",""))) AS `U. vendidas`, p.descripcion \nORDER BY `U. vendidas` DESC LIMIT 10\n\n\n',
          width: 9,
          height: 3,
          x: 0,
          y: 3,
          type: "pie",
          selection: {
            index: "p.descripcion",
            value: "U. vendidas",
            key: "(none)",
          },
          settings: {
            marginBottom: 100,
            marginTop: 60,
            marginLeft: 80,
            hideSelections: true,
            legend: true,
          },
        },
        {
          title: "",
          query:
            "MATCH (n:`n2`)-[:ES_SUBCATEGORIA]->(n1:`n1`) \nWHERE toLower(toString(n.`nombre`)) CONTAINS toLower($input) AND toLower(toString(n1.`nombre`))= toLower($neodash_n1_nombre)  \nRETURN DISTINCT n.`nombre` as value LIMIT 5",
          width: 4,
          height: 1,
          x: 4,
          y: 0,
          type: "select",
          selection: {},
          settings: {
            type: "Node Property",
            entityType: "n2",
            propertyType: "nombre",
            parameterName: "neodash_n2_nombre",
            suggestionsUpdateTimeout: 100,
          },
        },
        {
          title: "",
          query:
            "MATCH (n:`n3`)-[:ES_SUBCATEGORIA]->(n2:`n2`) \nWHERE toLower(toString(n.`nombre`)) CONTAINS toLower($input) AND toLower(toString(n2.`nombre`))= toLower($neodash_n2_nombre)  \nRETURN DISTINCT n.`nombre` as value LIMIT 5",
          width: 4,
          height: 1,
          x: 8,
          y: 0,
          type: "select",
          selection: {},
          settings: {
            type: "Node Property",
            entityType: "n3",
            propertyType: "nombre",
            parameterName: "neodash_n3_nombre",
            suggestionsUpdateTimeout: 100,
          },
        },
      ],
    },
    {
      title: "Marcas con más ventas",
      reports: [
        {
          title: "Marcas con más ventas",
          query:
            '\nMATCH (cd:control_diario)-[:GESTIONA]->(p:producto)-[:PERTENECE]->(m:marca)\nRETURN sum(toInteger(replace(cd.unidades_vendidas,".",""))) AS `U. vendidas`,m.nombre\nORDER BY `U. vendidas` DESC LIMIT 5\n\n',
          width: 6,
          height: 2,
          x: 0,
          y: 0,
          type: "pie",
          selection: {
            index: "m.nombre",
            value: "U. vendidas",
            key: "(none)",
          },
          settings: {
            hideSelections: true,
            marginBottom: 80,
          },
        },
        {
          title: "Marcas con menos ventas",
          query:
            '\nMATCH (cd:control_diario)-[:GESTIONA]->(p:producto)-[:PERTENECE]->(m:marca)\nWHERE toInteger(cd.unidades_vendidas) <> 0\nRETURN sum(toInteger(replace(cd.unidades_vendidas,".",""))) AS `U. vendidas`,m.nombre\nORDER BY `U. vendidas` ASC LIMIT 5\n',
          width: 6,
          height: 2,
          x: 6,
          y: 0,
          type: "pie",
          selection: {
            index: "m.nombre",
            value: "U. vendidas",
            key: "(none)",
          },
          settings: {
            hideSelections: true,
            marginBottom: 80,
          },
        },
        {
          title: "Marcas con más ventas",
          query:
            '\nMATCH (cd:control_diario)-[:GESTIONA]->(p:producto)-[:PERTENECE]->(m:marca)\nRETURN sum(toInteger(replace(cd.unidades_vendidas,".",""))) AS `U. vendidas`,m.nombre\nORDER BY `U. vendidas` DESC LIMIT 5\n\n',
          width: 6,
          height: 2,
          x: 0,
          y: 2,
          type: "bar",
          selection: {
            index: "U. vendidas",
            value: "U. vendidas",
            key: "(none)",
          },
          settings: {
            marginBottom: 120,
            marginLeft: 80,
            hideSelections: true,
          },
        },
        {
          title: "Marcas con menos ventas",
          query:
            '\nMATCH (cd:control_diario)-[:GESTIONA]->(p:producto)-[:PERTENECE]->(m:marca)\nWHERE toInteger(cd.unidades_vendidas) <> 0\nRETURN sum(toInteger(replace(cd.unidades_vendidas,".",""))) AS `U. vendidas`,m.nombre\nORDER BY `U. vendidas` ASC LIMIT 5\n',
          width: 6,
          height: 2,
          x: 6,
          y: 2,
          type: "bar",
          selection: {
            index: "m.nombre",
            value: "U. vendidas",
            key: "(none)",
          },
          settings: {
            hideSelections: true,
            marginBottom: 110,
            marginLeft: 80,
          },
        },
      ],
    },
    {
      title: "Productos por punto de venta",
      reports: [
        {
          title: "Gráfico de barras",
          query:
            '\nMATCH (pv:punto_venta)-[:TIENE]->(cd:control_diario)-[:GESTIONA]->(p:producto)<-[:CLASIFICA]-(c:n3)\nWHERE pv.nombre = $neodash_punto_venta_nombre AND c.nombre = $neodash_n3_nombre\nRETURN replace(cd.unidades_vendidas,".","") AS value , p.descripcion\nORDER BY toInteger(value) DESC LIMIT 10\n\n',
          width: 9,
          height: 2,
          x: 3,
          y: 2,
          type: "bar",
          selection: {
            index: "p.descripcion",
            value: "value",
            key: "(none)",
          },
          settings: {
            hideSelections: true,
            marginBottom: 80,
            marginLeft: 60,
          },
        },
        {
          title: "Categoria",
          query:
            "MATCH (n:`n3`)-[:ES_SUBCATEGORIA]->(n2:`n2`) \nWHERE toLower(toString(n.`nombre`)) CONTAINS toLower($input) AND toLower(toString(n2.`nombre`))= toLower($neodash_n2_nombre)  \nRETURN DISTINCT n.`nombre` as value LIMIT 5",
          width: 3,
          height: 1,
          x: 0,
          y: 2,
          type: "select",
          selection: {},
          settings: {
            type: "Node Property",
            entityType: "n3",
            propertyType: "nombre",
            parameterName: "neodash_n3_nombre",
            suggestionsUpdateTimeout: 100,
          },
        },
        {
          title: "Punto de venta",
          query:
            "MATCH (n:`punto_venta`) \nWHERE toLower(toString(n.`nombre`)) CONTAINS toLower($input) \nRETURN DISTINCT n.`nombre` as value LIMIT 30",
          width: 3,
          height: 1,
          x: 0,
          y: 3,
          type: "select",
          selection: {},
          settings: {
            type: "Node Property",
            entityType: "punto_venta",
            propertyType: "nombre",
            parameterName: "neodash_punto_venta_nombre",
          },
        },
        {
          title: "Gráfico de torta",
          query:
            '\nMATCH (pv:punto_venta)-[:TIENE]->(cd:control_diario)-[:GESTIONA]->(p:producto)<-[:CLASIFICA]-(c:n3)\nWHERE cd.unidades_vendidas <> "0" AND pv.nombre = $neodash_punto_venta_nombre AND c.nombre = $neodash_n3_nombre\nRETURN replace(cd.unidades_vendidas,".","") AS value , p.descripcion\nORDER BY toInteger(value) DESC LIMIT 10\n\n',
          width: 9,
          height: 2,
          x: 3,
          y: 0,
          type: "pie",
          selection: {
            "index": "p.descripcion",
            "value": "value",
            "key": "(none)"
          },
          settings: {
            legend: true,
            marginBottom: 80,
            hideSelections: true,
          },
        },
        {
          title: "",
          query:
            "MATCH (n:`n2`)-[:ES_SUBCATEGORIA]->(n1:`n1`) \nWHERE toLower(toString(n.`nombre`)) CONTAINS toLower($input) AND toLower(toString(n1.`nombre`))= toLower($neodash_n1_nombre)  \nRETURN DISTINCT n.`nombre` as value LIMIT 5",
          width: 3,
          height: 1,
          x: 0,
          y: 1,
          type: "select",
          selection: {},
          settings: {
            type: "Node Property",
            entityType: "n2",
            propertyType: "nombre",
            parameterName: "neodash_n2_nombre",
            suggestionsUpdateTimeout: 100,
          },
        },
        {
          title: "",
          query:
            "MATCH (n:`n1`) \nWHERE toLower(toString(n.`nombre`)) CONTAINS toLower($input) \nRETURN DISTINCT n.`nombre` as value LIMIT 5",
          width: 3,
          height: 1,
          x: 0,
          y: 0,
          type: "select",
          selection: {},
          settings: {
            type: "Node Property",
            entityType: "n1",
            propertyType: "nombre",
            parameterName: "neodash_n1_nombre",
          },
        },
      ],
    },
    {
      title: "Ventas por municipio",
      reports: [
        {
          title: "Gráfico de torta",
          query:
            '\nMATCH (c:control_diario)-[p:TIENE]-(pv:punto_venta)-[u:ESTA_UBICADO]-(m:municipio)\nWHERE m.nombre = $neodash_municipio_nombre\nRETURN sum(toInteger(replace(c.unidades_vendidas,".",""))) AS `U. vendidas`, pv.nombre\n\n',
          width: 8,
          height: 2,
          x: 3,
          y: 0,
          type: "pie",
          selection: {
            index: "pv.nombre",
            value: "U. vendidas",
            key: "(none)",
          },
          settings: {
            hideSelections: true,
            legend: true,
          },
        },
        {
          title: "Municipio",
          query:
            "MATCH (n:`municipio`) \nWHERE toLower(toString(n.`nombre`)) CONTAINS toLower($input) \nRETURN DISTINCT n.`nombre` as value LIMIT 30",
          width: 3,
          height: 2,
          x: 0,
          y: 0,
          type: "select",
          selection: {},
          settings: {
            type: "Node Property",
            entityType: "municipio",
            propertyType: "nombre",
            parameterName: "neodash_municipio_nombre",
          },
        },
        {
          title: "Gráfico de barras",
          query:
            '\nMATCH (c:control_diario)-[p:TIENE]-(pv:punto_venta)-[u:ESTA_UBICADO]-(m:municipio)\nWHERE m.nombre = $neodash_municipio_nombre\nRETURN sum(toInteger(replace(c.unidades_vendidas,".",""))) AS `U. vendidas`, pv.nombre\n\n',
          width: 11,
          height: 2,
          x: 0,
          y: 2,
          type: "bar",
          selection: {
            index: "pv.nombre",
            value: "U. vendidas",
            key: "(none)",
          },
          settings: {
            hideSelections: true,
            groupMode: "grouped",
            layout: "vertical",
            marginLeft: 60,
            marginBottom: 80,
          },
        },
      ],
    },
    {
      title: "",
      reports: [
        {
          title: "",
          query:
            "MATCH (n:`n1`) \nWHERE toLower(toString(n.`nombre`)) CONTAINS toLower($input) \nRETURN DISTINCT n.`nombre` as value LIMIT 5",
          width: 3,
          height: 1,
          x: 0,
          y: 0,
          type: "select",
          selection: {},
          settings: {
            type: "Node Property",
            entityType: "n1",
            propertyType: "nombre",
            parameterName: "neodash_n1_nombre",
            clearParameterOnFieldClear: true,
            manualPropertyNameSpecification: true,
            suggestionsUpdateTimeout: 100,
            setParameterTimeout: 100,
          },
        },
        {
          title: "Reporto",
          query:
            "MATCH (n:`n2`)-[:ES_SUBCATEGORIA]->(n1:`n1`) \nWHERE toLower(toString(n.`nombre`)) CONTAINS toLower($input) AND toLower(toString(n1.`nombre`))= toLower($neodash_n1_nombre)  \nRETURN DISTINCT n.`nombre` as value LIMIT 5",
          width: 3,
          height: 1,
          x: 0,
          y: 1,
          type: "select",
          selection: {},
          settings: {
            type: "Node Property",
            entityType: "n2",
            propertyType: "nombre",
            parameterName: "neodash_n2_nombre",
            clearParameterOnFieldClear: true,
            manualPropertyNameSpecification: true,
            helperText: "Subcategoria",
            suggestionsUpdateTimeout: 100,
            setParameterTimeout: 100,
          },
        },
      ],
    },
  ],
  parameters: {},
};
