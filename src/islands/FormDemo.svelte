<script lang="ts">
  import { Card, Form } from "../components";
  import type { JsonSchema } from "../components/types";

  const jsonschema: JsonSchema = {
    $id: "",
    title: "Profile",
    description: "Every control below is inferred from the JSON Schema.",
    type: "object",
    required: ["name", "email"],
    properties: {
      name: {
        type: "string",
        title: "Full name",
        minLength: 2,
        examples: ["Ada Lovelace"],
      },
      email: {
        type: "string",
        title: "Email",
        format: "email",
        examples: ["ada@example.com"],
      },
      age: {
        type: "integer",
        title: "Age",
        minimum: 0,
        maximum: 120,
      },
      role: {
        type: "string",
        title: "Role",
        enum: ["Engineer", "Designer", "Product manager"],
        default: "Engineer",
      },
      newsletter: {
        type: "boolean",
        title: "Product updates",
        description: "Send me occasional release notes.",
        default: true,
      },
      interests: {
        type: "array",
        title: "Interests",
        items: {
          type: "string",
          enum: ["Design", "Engineering", "Product"],
        },
      },
      bio: {
        type: "string",
        title: "Bio",
        description: "A short introduction. Long text fields become textareas.",
        maxLength: 280,
      },
      startDate: {
        type: "string",
        title: "Start date",
        format: "date",
      },
      address: {
        type: "object",
        title: "Address",
        properties: {
          street: { type: "string", title: "Street" },
          city: { type: "string", title: "City" },
          postalCode: { type: "string", title: "Postal code" },
        },
      },
    },
  };

  let submitted = $state<Record<string, unknown> | null>(null);

  async function handleSubmit(values: Record<string, unknown>) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    submitted = values;
  }
</script>

<div data-gap="6">
  <Form
    {jsonschema}
    columns={2}
    storageKey="wacss:demo:form"
    submitLabel="Save profile"
    showReset
    onSubmit={handleSubmit}
  />

  {#if submitted}
    <Card title="Submitted values" description="The onSubmit callback receives the current form values.">
      <pre>{JSON.stringify(submitted, null, 2)}</pre>
    </Card>
  {/if}
</div>
