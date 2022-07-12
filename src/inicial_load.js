export const texto =

{
  "title": "Logyca",
  "version": "2.1",
  "settings": {
    "pagenumber": 0,
    "editable": true,
    "fullscreenEnabled": false,
    "downloadImageEnabled": false,
    "parameters": {
      "neodash_punto_venta_nombre": "BUGA CENTRO",
      "neodash_categoria_nombre": "FRUTAS A GRANEL",
      "neodash_municipio_nombre": "Cali"
    }
  },
  "pages": [
    {
      "title": "Top 10 productos más vendidos por categorias",
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
          "title": "Gráfico de barras",
          "query": "MATCH (cd:control_diario)-[:GESTIONA]->(p:producto)<-[:CLASIFICA]-(c:categoria)\nWHERE c.nombre = $neodash_categoria_nombre\nRETURN sum(toInteger(replace(cd.unidades_vendidas,\".\",\"\"))) AS `U. vendidas`, p.descripcion \nORDER BY `U. vendidas` DESC LIMIT 10\n\n\n",
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
          "settings": {
            "marginBottom": 100,
            "marginLeft": 80,
            "hideSelections": true
          }
        },
        {
          "title": "Gráfico de torta",
          "query": "MATCH (cd:control_diario)-[:GESTIONA]->(p:producto)<-[:CLASIFICA]-(c:categoria)\nWHERE c.nombre = $neodash_categoria_nombre\nRETURN sum(toInteger(replace(cd.unidades_vendidas,\".\",\"\"))) AS `U. vendidas`, p.descripcion \nORDER BY `U. vendidas` DESC LIMIT 10\n\n\n",
          "width": 10,
          "height": 3,
          "x": 0,
          "y": 2,
          "type": "pie",
          "selection": {
            "index": "p.descripcion",
            "value": "U. vendidas",
            "key": "(none)"
          },
          "settings": {
            "marginBottom": 100,
            "marginTop": 60,
            "marginLeft": 80,
            "hideSelections": true,
            "legend": true
          }
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
          "settings": {
            "hideSelections": true,
            "marginBottom": 80,
          }
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
          "settings": {
            "hideSelections": true,
            "marginBottom": 80
          }
        },
        {
          "title": "Marcas con más ventas",
          "query": "\nMATCH (cd:control_diario)-[:GESTIONA]->(p:producto)-[:PERTENECE]->(m:marca)\nRETURN sum(toInteger(replace(cd.unidades_vendidas,\".\",\"\"))) AS `U. vendidas`,m.nombre\nORDER BY `U. vendidas` DESC LIMIT 5\n\n",
          "width": 6,
          "height": 2,
          "x": 0,
          "y": 2,
          "type": "bar",
          "selection": {
            "index": "m.nombre",
            "value": "U. vendidas",
            "key": "(none)"
          },
          "settings": {
            "marginBottom": 120,
            "marginLeft": 80,
            "hideSelections": true
          }
        },
        {
          "title": "Marcas con menos ventas",
          "query": "\nMATCH (cd:control_diario)-[:GESTIONA]->(p:producto)-[:PERTENECE]->(m:marca)\nWHERE toInteger(cd.unidades_vendidas) <> 0\nRETURN sum(toInteger(replace(cd.unidades_vendidas,\".\",\"\"))) AS `U. vendidas`,m.nombre\nORDER BY `U. vendidas` ASC LIMIT 5\n",
          "width": 6,
          "height": 2,
          "x": 6,
          "y": 2,
          "type": "bar",
          "selection": {
            "index": "m.nombre",
            "value": "U. vendidas",
            "key": "(none)"
          },
          "settings": {
            "hideSelections": true,
            "marginBottom": 110,
            "marginLeft": 80
          }
        }
      ]
    },
    {
      "title": "Productos más vendidos por un punto de venta",
      "reports": [
        {
          "title": "Gráfico de barras",
          "query": "\nMATCH (pv:punto_venta)-[:TIENE]->(cd:control_diario)-[:GESTIONA]->(p:producto)<-[:CLASIFICA]-(c:categoria)\nWHERE pv.nombre = $neodash_punto_venta_nombre AND c.nombre = $neodash_categoria_nombre\nRETURN replace(cd.unidades_vendidas,\".\",\"\") AS value , p.descripcion\nORDER BY toInteger(value) DESC LIMIT 10\n\n",
          "width": 12,
          "height": 2,
          "x": 0,
          "y": 2,
          "type": "bar",
          "selection": {
            "index": "p.descripcion",
            "value": "value",
            "key": "(none)"
          },
          "settings": {
            "hideSelections": true,
            "marginBottom": 80,
            "marginLeft": 60
          }
        },
        {
          "title": "Categoria",
          "query": "MATCH (n:`categoria`) \nWHERE toLower(toString(n.`nombre`)) CONTAINS toLower($input) \nRETURN DISTINCT n.`nombre` as value LIMIT 5",
          "width": 3,
          "height": 1,
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
          "height": 1,
          "x": 0,
          "y": 1,
          "type": "select",
          "selection": {},
          "settings": {
            "type": "Node Property",
            "entityType": "punto_venta",
            "propertyType": "nombre",
            "parameterName": "neodash_punto_venta_nombre"
          }
        },
        {
          "title": "Gráfico de torta",
          "query": "\nMATCH (pv:punto_venta)-[:TIENE]->(cd:control_diario)-[:GESTIONA]->(p:producto)<-[:CLASIFICA]-(c:categoria)\nWHERE pv.nombre = $neodash_punto_venta_nombre AND c.nombre = $neodash_categoria_nombre\nRETURN replace(cd.unidades_vendidas,\".\",\"\") AS value , p.descripcion\nORDER BY toInteger(value) DESC LIMIT 10\n\n",
          "width": 9,
          "height": 2,
          "x": 3,
          "y": 0,
          "type": "pie",
          "selection": {
            "index": "p.descripcion",
            "value": "value",
            "key": "(none)"
          },
          "settings": {
            "legend": true,
            "marginBottom": 80,
            "hideSelections": true
          }
        }
      ]
    },
    {
      "title": "Ventas por Punto de venta y municipio",
      "reports": [
        {
          "title": "Gráfico de torta",
          "query": "\nMATCH (c:control_diario)-[p:TIENE]-(pv:punto_venta)-[u:ESTA_UBICADO]-(m:municipio)\nWHERE m.nombre = $neodash_municipio_nombre\nRETURN sum(toInteger(replace(c.unidades_vendidas,\".\",\"\"))) AS `U. vendidas`, pv.nombre\n\n",
          "width": 8,
          "height": 2,
          "x": 3,
          "y": 0,
          "type": "pie",
          "selection": {
            "index": "pv.nombre",
            "value": "U. vendidas",
            "key": "(none)"
          },
          "settings": {
            "hideSelections": true,
            "legend": true
          }
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
        },
        {
          "title": "Gráfico de barras",
          "query": "\nMATCH (c:control_diario)-[p:TIENE]-(pv:punto_venta)-[u:ESTA_UBICADO]-(m:municipio)\nWHERE m.nombre = $neodash_municipio_nombre\nRETURN sum(toInteger(replace(c.unidades_vendidas,\".\",\"\"))) AS `U. vendidas`, pv.nombre\n\n",
          "width": 11,
          "height": 2,
          "x": 0,
          "y": 2,
          "type": "bar",
          "selection": {
            "index": "pv.nombre",
            "value": "U. vendidas",
            "key": "(none)"
          },
          "settings": {
            "hideSelections": true,
            "groupMode": "grouped",
            "layout": "vertical",
            "marginLeft": 60,
            "marginBottom": 80
          }
        }
      ]
    }
  ],
  "parameters": {}
}

