import { z } from 'zod';

const rendererMetaSchema = z.object({
  type: z.literal('file').or(z.literal('folder')),
  renderer: z.string(),
  stylesheet: z.string().optional(),
  fontHint: z.literal('text').or(z.literal('code')),
  supportedExtensions: z.array(z.string()),
});

const newFileMetaSchema = z.object({
  label: z.string(),
  extension: z.string(),
});

const rendererContributesSchema = z.object({
  type: z.literal('renderer'),
  meta: rendererMetaSchema,
});

const newFileContributesSchema = z.object({
  type: z.literal('new_file'),
  meta: newFileMetaSchema,
});

export const PluginManifestSchema = z.object({
  manifestVersion: z.literal(1),
  name: z.string(),
  version: z.string(),
  description: z.string(),
  contributes: z.array(rendererContributesSchema.or(newFileContributesSchema)),
});

export type PluginManifest = z.infer<typeof PluginManifestSchema> & {
  folder: string;
};

export type PluginManifestRendererMeta = z.infer<typeof rendererMetaSchema>;
