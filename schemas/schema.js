
module.exports = {
  type: 'object',
  properties: {
    universalScheduleStandard: {
      type: 'object',
      properties: {
        id: {type: 'string'},
        author: {type: 'string', nullable: true},
        company: {type: 'string', nullable: true},
        created: {type: 'string'},
        episode: {type: 'string', nullable: true},
        episodeName: {type: 'string', nullable: true},
        description: {type: 'string', nullable: true},
        name: {type: 'string'},
        project: {type: 'string', nullable: true},
        schedColor: {type: 'string', nullable: true},
        schedDate: {type: 'string', nullable: true},
        scriptColor: {type: 'string', nullable: true},
        scriptDate: {type: 'string', nullable: true},
        season: {type: 'string', nullable: true},
        source: {type: 'string'},
        ussVersion: {type: 'string'},
        breakdowns: {
          type: 'array', 
          minItems: 1,
          items: {
            type: 'object',
            properties: {
              id: {type: 'string'},
              bannerText: {type: 'string', nullable: true},
              comments: {type: 'string', nullable: true},
              created: {type: 'string'},
              description: {type: 'string', nullable: true},
              elements: {type: 'array', items: {type: 'string'}},
              pages: {type: 'number', minimum: 0, multipleOf: .125, nullable: true},
              scene: {type: 'string', nullable: true},
              scriptPage: {type: 'string', nullable: true},
              duration: {type: 'number', minimum: 0, nullable: true},
              type: {type: 'string', enum: ['scene','day','banner']}
            },
            required: ['id', 'bannerText', 'comments', 'created', 'description', 'elements', 'pages', 'scene', 'scriptPage', 'duration', 'type'],
            additionalProperties: false
          }
        },
        categories: {
          type: 'array',
          minItems: 1,
          items: {
            type: 'object',
            properties: {
              id: {type: 'string'},
              created: {type: 'string'},
              name: {type: 'string'},
              ucid: {type: 'number', minimum: 0},
            },
            required: ['id', 'created', 'name', 'ucid'],
            additionalProperties: false
          }
        },
        elements: {
          type: 'array',
          minItems: 1,
          items: {
            type: 'object',
            properties: {
              id: {type: 'string'},
              category: {type: 'string'},
              created: {type: 'string'},
              daysOff: {type: 'array', maxItems: 7, uniqueItems: true, items: {type: 'number', minimum: 0, maximum: 6}},
              dropDayCount: {type: 'number'},
              elementId: {type: 'string', nullable: true},
              events: {
                type: 'array', 
                nullable: true,
                items: {
                  type: 'object',
                  properties: {
                    id: {type: 'string'},
                    date: {type: 'string'},
                    type: {type: 'string'},
                    name: {type: 'string', nullable: true},
                  },
                  required: ['id', 'date', 'type', 'name'],
                  additionalProperties: false
                }
              },
              isDood: {type: 'boolean'},
              isDrop: {type: 'boolean'},
              isHold: {type: 'boolean'},
              isIdLock: {type: 'boolean'},
              linkedElements: {type: 'array', items: {type: 'string'}, nullable: true},
              name: {type: 'string'},
            },
            required: ['id', 'category', 'created', 'daysOff', 'dropDayCount', 'elementId', 'events', 'isDood', 'isDrop', 'isHold', 'isIdLock', 'linkedElements', 'name'],
            additionalProperties: false
          }
        },
        stripboards: {
          type: 'array', 
          nullable: true,
          items: {
            type: 'object',
            properties: {
              id: {type: 'string'},
              boards: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {type: 'string'},
                    name: {type: 'string'},
                    breakdownIds:{type: 'array', items: {oneOf: [{type: "array"}, {type: "string"}]}}
                  },
                  required: ['id', 'name', 'breakdownIds'],
                  additionalProperties: false
                }
              },
              calendar: {type: 'string', nullable: true},
              name: {type: 'string'},
            },
            required: ['id', 'boards', 'calendar', 'name'],
            additionalProperties: false
          }
        },
        calendars: {
          type: 'array', 
          nullable: true,
          items: {
            type: 'object',
            properties: {
              id: {type: 'string'},
              daysOff: {type: 'array', maxItems: 7, uniqueItems: true, items: {type: 'number', minimum: 0, maximum: 6}},
              events: {
                type: 'array', 
                nullable: true,
                items: {
                  type: 'object',
                  properties: {
                    id: {type: 'string'},
                    date: {type: 'string'},
                    type: {type: 'string'},
                    name: {type: 'string', nullable: true},
                  },
                  required: ['id', 'date', 'type', 'name'],
                  additionalProperties: false
                }
              },
              name: {type: 'string'},
            },
            required: ['id', 'daysOff', 'events', 'name'],
            additionalProperties: false
          }
        }
      },
      required: ['id','author','company','created','episode','episodeName','description','name','project','schedColor','schedDate','scriptColor','scriptDate','season','source','ussVersion','breakdowns','categories','elements'],
      additionalProperties: false
    }
  },
  required: ['universalScheduleStandard'],
  additionalProperties: false
}
