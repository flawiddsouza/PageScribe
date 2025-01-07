import { z } from 'zod';

export const PluginManifestSchema = z.object({
  manifestVersion: z.literal(1),
  name: z.string(),
  version: z.string(),
  description: z.string(),
  contributes: z.array(z.object({
    type: z.literal('renderer'),
    meta: z.object({
      type: z.literal('file').or(z.literal('folder')),
      renderer: z.string(),
      stylesheet: z.string().optional(),
      fontHint: z.literal('text').or(z.literal('code')),
      supportedExtensions: z.array(z.string()),
    }),
  })),
});

export type PluginManifest = z.infer<typeof PluginManifestSchema> & {
  folder: string;
};
