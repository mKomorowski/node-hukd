module.exports = {
  "id": "/HUKDoptions",
  "type": "object",
  "properties": {
    "output": {
      "type": "string",
      "enum": ["xml", "json"],
      "required": false
    },
    "forum": {
      "type": "string",
      "enum": ["all", "deals", "vouchers", "freebies", "competitions", "deal-requests", "for-sale-trade",
        "misc", "feedback"],
      "required": false
    },
    "category": {
      "type": "string",
      "enum": ["computers", "audiovisual", "entertainment", "fashion", "home", "mobiles", "travel", "groceries",
        "kids", "other-deals", "gaming", "restaurant"],
      "required": false
    },
    "online_offline": {
      "type": "string",
      "enum": ["online", "offline"],
      "required": false
    },
    "order": {
      "type": "string",
      "enum": ["new", "discussed", "hot"],
      "required": false
    },
    "page": {
      "type": "number",
      "minimum": 1,
      "required": false
    },
    "results_per_page": {
      "type": "number",
      "minimum": 1,
      "maximum": 30,
      "required": false
    },
    "exclude_expired": {
      "type": "boolean",
      "required": false
    }
  }
};