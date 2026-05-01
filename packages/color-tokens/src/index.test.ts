import { describe, it, expect } from 'vitest';
import { 
  primitiveColors, 
  lightSemanticColors, 
  darkSemanticColors, 
  hexToRgb,
  withOpacity 
} from './index';

describe('Color Tokens Core', () => {
  describe('Primitive Tokens', () => {
    it('should have 22 color families plus standalone colors', () => {
      const families = Object.keys(primitiveColors);
      expect(families).toContain('blue');
      expect(families).toContain('red');
      expect(families).toContain('gray');
      expect(families).toContain('white');
      expect(families).toContain('black');
    });

    it('should have 11 shades for blue', () => {
      const shades = Object.keys(primitiveColors.blue);
      expect(shades.length).toBe(11);
    });
  });

  describe('Semantic Tokens', () => {
    it('should have light and dark themes', () => {
      expect(lightSemanticColors).toBeDefined();
      expect(darkSemanticColors).toBeDefined();
    });

    it('should have consistent categories across themes', () => {
      const lightCategories = Object.keys(lightSemanticColors);
      const darkCategories = Object.keys(darkSemanticColors);
      expect(lightCategories).toEqual(darkCategories);
      expect(lightCategories).toContain('brand');
      expect(lightCategories).toContain('background');
    });
  });

  describe('Utility Functions', () => {
    it('should convert hex to rgb', () => {
      const rgb = hexToRgb('#000000');
      expect(rgb).toEqual({ r: 0, g: 0, b: 0 });
    });

    it('should apply opacity', () => {
      const rgba = withOpacity('#000000', 0.5);
      expect(rgba).toBe('rgba(0, 0, 0, 0.5)');
    });
  });
});
