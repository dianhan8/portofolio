import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: "1fd55c0a-becc-410f-9605-47d628aa6ead", // Get this from tina.io
  token: "9b324c8b494210bb0bb3163448bca84a64ff08f0", // Get this from tina.io
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: 'page',
        label: 'Pages',
        path: 'content/page',
        format: 'md',
        ui: {
          router: ({ document }) => {
            // navigate to the home page
            if (document._sys.filename === 'homepage') {
              return '/'
            }
          }
        },
        fields: [
          {
            type: 'string',
            name: 'page_title',
            label: 'Page Title',
            isTitle: true,
            required: true,
          },
          {
            type: 'string',
            name: 'short_text',
            label: 'Short Text',
            required: true,
          },
          {
            isBody: true,
            type: "rich-text",
            name: 'long_text',
            label: 'Long Text',
            required: true,
            templates: [
              {
                name: "SocialMediaButton",
                label: "Social Media Button",
                fields: [
                  {
                    name: "button_label",
                    label: "Button Label",
                    type: "string"
                  },
                  {
                    name: "button_href",
                    label: "Button Link",
                    type: "string"
                  },
                  {
                    name: "button_external",
                    label: "Is External Link?",
                    type: "boolean"
                  },
                ]
              }
            ]
          },
          {
            type: 'string',
            name: 'seo_description',
            label: 'SEO Description',
          }
        ]
      },
      {
        name: 'project',
        label: 'Project',
        path: 'content/project',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Project Title',
            isTitle: true,
            required: true,
          },
          {
            type: 'string',
            name: 'description',
            label: 'Project Description',
            required: true,
          },
          {
            type: 'string',
            name: 'code_language',
            label: 'Code Language',
            required: true,
          },
          {
            type: 'string',
            name: 'platform',
            label: 'Platform',
            list: true,
          },
          {
            type: 'datetime',
            name: 'time_end',
            label: 'Date Finish',
            ui: {
              dateFormat: 'MM YYYY'
            }
          },
          {
            type: 'string',
            name: 'client',
            label: 'Client Name',
            required: true,
          },
          {
            isBody: true,
            type: "rich-text",
            name: 'long_text',
            label: 'Story',
            templates: []
          }
        ],
        ui: {
          router: ({ document }) => `/project/${document._sys.filename}`
        }
      },
      {
        name: 'blog',
        label: 'Blogs',
        path: 'content/blog',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Blog Title',
            isTitle: true,
            required: true,
          },
          {
            type: 'string',
            name: 'description',
            label: 'Blog Description',
            ui: {
              component: 'textarea'
            }
          },
          {
            type: 'datetime',
            label: 'Date Published',
            name: 'published',
            ui: {
              dateFormat: 'DD MM YYYY HH:mm'
            }
          },
          {
            type: 'string',
            name: 'provider_name',
            label: 'Provider Name'
          },
          {
            type: 'string',
            name: 'provider_url',
            label: 'Provider URL',
          }
        ],
        ui: {
          router: () => '/'
        }
      }
    ],
  },
});
