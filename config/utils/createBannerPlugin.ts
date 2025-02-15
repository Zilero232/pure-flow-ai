import type { PackageJson } from '../types';

export const createBannerPlugin = (pkg: PackageJson): string =>
`/**
 * ${pkg.name} v${pkg.version}
 * ${pkg.description || ''}
 *
 * @author ${pkg.author || ''}
 * @license ${pkg.license || ''}
 * @copyright (c) ${new Date().getFullYear()}
 */`;
