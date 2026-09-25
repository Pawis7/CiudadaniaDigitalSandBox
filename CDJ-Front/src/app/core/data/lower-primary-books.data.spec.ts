import { LOWER_PRIMARY_BOOKS } from './lower-primary-books.data';

describe('Lower primary books for shared reading', () => {
  const adultForBook: Record<string, RegExp> = {
    'bit-puente-por-terminar': /papá/iu,
    'bit-ventana-inesperada': /mamá/iu,
    'bit-boton-brillante': /abuela/iu,
    'bit-cartel-clase': /maestra/iu,
  };

  it('provides the four books as reading experiences without recorded or synthetic narration', () => {
    expect(Object.keys(LOWER_PRIMARY_BOOKS).sort()).toEqual(Object.keys(adultForBook).sort());
    for (const book of Object.values(LOWER_PRIMARY_BOOKS)) {
      expect(book.readingOnly).toBe(true);
      expect(book.collectionLabel).toBe('Colección Primaria baja · Cuentos para leer juntos');
      for (const spread of book.spreads) {
        expect(spread.narration.audioSrc).toBeUndefined();
        expect(spread.narration.fallbackSegments).toEqual([]);
      }
    }
  });

  it('keeps an adult present throughout five developed scenes and matches each illustration to its scene', () => {
    for (const book of Object.values(LOWER_PRIMARY_BOOKS)) {
      expect(book.spreads).toHaveLength(7);
      expect(book.spreads[0].kind).toBe('cover');
      expect(book.spreads[0].leftPage.src).toBe(`/cuentos/PrimariaBaja/${book.id}/02-escena-1.webp`);
      const scenes = book.spreads.slice(1, 6);
      scenes.forEach((scene, index) => {
        const text = scene.blocks!.map((block) => block.text).join(' ');
        const words = text.trim().split(/\s+/u).length;
        expect(words).toBeGreaterThanOrEqual(60);
        expect(words).toBeLessThanOrEqual(95);
        expect(text).toMatch(adultForBook[book.id]);
        expect(scene.leftPage.src).toBe(
          `/cuentos/PrimariaBaja/${book.id}/${String(index + 2).padStart(2, '0')}-escena-${index + 1}.webp`,
        );
        expect(scene.leftPage.alt).toMatch(adultForBook[book.id]);
        expect(scene.pageLabel).toBe(`Escena ${index + 1} de 5`);
      });
    }
  });

  it('ends with a concrete conversation and an activity together away from the screen', () => {
    for (const book of Object.values(LOWER_PRIMARY_BOOKS)) {
      const finalScene = book.spreads[5];
      const rule = book.spreads[6];
      expect(rule.pageLabel).toBe('Regla final');
      expect(rule.leftPage.src).toBe(finalScene.leftPage.src);
      expect(book.ending.illustration?.src).toBe(finalScene.leftPage.src);
      expect(rule.blocks?.[0].text).toBe(book.ending.rule);
      expect(rule.blocks?.[1].text).toContain('¿');
      expect(book.ending.subtitle).toMatch(/persona adulta/iu);
      expect(book.ending.subtitle).toMatch(/bloques|papel|dibuj/iu);
      expect(rule.blocks?.[2].text).toBe(book.ending.subtitle);
    }
  });
});
