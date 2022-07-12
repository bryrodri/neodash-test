export const texto =

{
  "title": "Logyca",
  "version": "2.1",
  "settings": {
    "pagenumber": 3,
    "editable": true,
    "fullscreenEnabled": false,
    "parameters": {
      "neodash_punto_venta_nombre": "BUGA CENTRO",
      "neodash_categoria_nombre": "GRANOS ARROZ",
      "neodash_municipio_nombre": "Tulua"
    }
  },
  "pages": [
    {
      "title": "Top 3 productos más vendidos por categorias",
      "reports": [
        {
          "title": "Categoría",
          "query": "MATCH (n:`categoria`) \nWHERE toLower(toString(n.`nombre`)) CONTAINS toLower($input) \nRETURN DISTINCT n.`nombre` as value LIMIT 5",
          "width": 3,
          "height": 2,
          "x": 0,
          "y": 0,
          "type": "select",
          "selection": {},
          "settings": {
            "type": "Node Property",
            "entityType": "categoria",
            "propertyType": "nombre",
            "parameterName": "neodash_categoria_nombre"
          }
        },
        {
          "title": "Tres productos más vendidos",
          "query": "MATCH (cd:control_diario)-[:GESTIONA]->(p:producto)<-[:CLASIFICA]-(c:categoria)\nWHERE c.nombre = $neodash_categoria_nombre\nRETURN sum(toInteger(replace(cd.unidades_vendidas,\".\",\"\"))) AS `U. vendidas`, p.descripcion \nORDER BY `U. vendidas` DESC LIMIT 3\n\n\n",
          "width": 7,
          "height": 2,
          "x": 3,
          "y": 0,
          "type": "bar",
          "selection": {
            "index": "p.descripcion",
            "value": "U. vendidas",
            "key": "(none)"
          },
          "settings": {}
        }
      ]
    },
    {
      "title": "Marcas con más ventas",
      "reports": [
        {
          "title": "Marcas con más ventas",
          "query": "\nMATCH (cd:control_diario)-[:GESTIONA]->(p:producto)-[:PERTENECE]->(m:marca)\nRETURN sum(toInteger(replace(cd.unidades_vendidas,\".\",\"\"))) AS `U. vendidas`,m.nombre\nORDER BY `U. vendidas` DESC LIMIT 5\n\n",
          "width": 6,
          "height": 2,
          "x": 0,
          "y": 0,
          "type": "pie",
          "selection": {
            "index": "m.nombre",
            "value": "U. vendidas",
            "key": "(none)"
          },
          "settings": {}
        },
        {
          "title": "Marcas con menos ventas",
          "query": "\nMATCH (cd:control_diario)-[:GESTIONA]->(p:producto)-[:PERTENECE]->(m:marca)\nWHERE toInteger(cd.unidades_vendidas) <> 0\nRETURN sum(toInteger(replace(cd.unidades_vendidas,\".\",\"\"))) AS `U. vendidas`,m.nombre\nORDER BY `U. vendidas` ASC LIMIT 5\n",
          "width": 6,
          "height": 2,
          "x": 6,
          "y": 0,
          "type": "pie",
          "selection": {
            "index": "m.nombre",
            "value": "U. vendidas",
            "key": "(none)"
          },
          "settings": {}
        }
      ]
    },
    {
      "title": "Productos más vendidos por un punto de venta",
      "reports": [
        {
          "title": "",
          "query": "\nMATCH (pv:punto_venta)-[:TIENE]->(cd:control_diario)-[:GESTIONA]->(p:producto)<-[:CLASIFICA]-(c:categoria)\nWHERE pv.nombre = $neodash_punto_venta_nombre AND c.nombre = $neodash_categoria_nombre\nRETURN replace(cd.unidades_vendidas,\".\",\"\") AS value , p.descripcion\nORDER BY toInteger(value) DESC LIMIT 10\n\n",
          "width": 8,
          "height": 2,
          "x": 0,
          "y": 2,
          "type": "bar",
          "selection": {
            "index": "p.descripcion",
            "value": "value",
            "key": "(none)"
          },
          "settings": {}
        },
        {
          "title": "Categoria",
          "query": "MATCH (n:`categoria`) \nWHERE toLower(toString(n.`nombre`)) CONTAINS toLower($input) \nRETURN DISTINCT n.`nombre` as value LIMIT 5",
          "width": 3,
          "height": 2,
          "x": 0,
          "y": 0,
          "type": "select",
          "selection": {},
          "settings": {
            "type": "Node Property",
            "entityType": "categoria",
            "propertyType": "nombre",
            "parameterName": "neodash_categoria_nombre"
          }
        },
        {
          "title": "Punto de venta",
          "query": "MATCH (n:`punto_venta`) \nWHERE toLower(toString(n.`nombre`)) CONTAINS toLower($input) \nRETURN DISTINCT n.`nombre` as value LIMIT 5",
          "width": 3,
          "height": 2,
          "x": 3,
          "y": 0,
          "type": "select",
          "selection": {},
          "settings": {
            "type": "Node Property",
            "entityType": "punto_venta",
            "propertyType": "nombre",
            "parameterName": "neodash_punto_venta_nombre"
          }
        }
      ]
    },
    {
      "title": "Ventas por Punto de venta y municipio",
      "reports": [
        {
          "title": "",
          "query": "\nMATCH (c:control_diario)-[p:TIENE]-(pv:punto_venta)-[u:ESTA_UBICADO]-(m:municipio)\nWHERE m.nombre = $neodash_municipio_nombre\nRETURN sum(toInteger(replace(c.unidades_vendidas,\".\",\"\"))) AS `U. vendidas`, pv.nombre\n\n",
          "width": 12,
          "height": 2,
          "x": 0,
          "y": 2,
          "type": "pie",
          "selection": {
            "index": "pv.nombre",
            "value": "U. vendidas",
            "key": "(none)"
          },
          "settings": {}
        },
        {
          "title": "Municipio",
          "query": "MATCH (n:`municipio`) \nWHERE toLower(toString(n.`nombre`)) CONTAINS toLower($input) \nRETURN DISTINCT n.`nombre` as value LIMIT 5",
          "width": 3,
          "height": 2,
          "x": 0,
          "y": 0,
          "type": "select",
          "selection": {},
          "settings": {
            "type": "Node Property",
            "entityType": "municipio",
            "propertyType": "nombre",
            "parameterName": "neodash_municipio_nombre"
          }
        }
      ]
    }
  ],
  "parameters": {}
}

