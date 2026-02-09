import { allEmoji, categoryNames, emojiByCategory } from 'src/data/emoji';

describe('emoji data adapter', () => {
  describe('allEmoji', () => {
    it('contains at least 1800 emoji', () => {
      expect(allEmoji.length).toBeGreaterThanOrEqual(1800);
    });

    it('each emoji has required fields', () => {
      for (const emoji of allEmoji) {
        expect(emoji.emoji).toBeTruthy();
        expect(emoji.name).toBeTruthy();
        expect(emoji.slug).toBeTruthy();
        expect(emoji.group).toBeTruthy();
        expect(Array.isArray(emoji.keywords)).toBe(true);
      }
    });

    it('includes a known emoji with correct data', () => {
      const grinning = allEmoji.find((e) => e.emoji === '😀');
      expect(grinning).toBeDefined();
      expect(grinning?.name).toBe('grinning face');
      expect(grinning?.slug).toBe('grinning_face');
      expect(grinning?.group).toBe('Smileys & Emotion');
      expect(grinning?.keywords.length).toBeGreaterThan(0);
    });
  });

  describe('categoryNames', () => {
    it('contains at least 8 categories', () => {
      expect(categoryNames.length).toBeGreaterThanOrEqual(8);
    });

    it('includes known categories', () => {
      expect(categoryNames).toContain('Smileys & Emotion');
      expect(categoryNames).toContain('Animals & Nature');
      expect(categoryNames).toContain('Food & Drink');
    });

    it('preserves order from emoji data', () => {
      const firstEmojiGroup = allEmoji[0].group;
      expect(categoryNames[0]).toBe(firstEmojiGroup);
    });
  });

  describe('emojiByCategory', () => {
    it('has one entry per category name', () => {
      expect(emojiByCategory.length).toBe(categoryNames.length);
    });

    it('each category has a name and non-empty emoji array', () => {
      for (const category of emojiByCategory) {
        expect(category.name).toBeTruthy();
        expect(category.emoji.length).toBeGreaterThan(0);
      }
    });

    it('all emoji in a category belong to that group', () => {
      for (const category of emojiByCategory) {
        for (const emoji of category.emoji) {
          expect(emoji.group).toBe(category.name);
        }
      }
    });

    it('total emoji across all categories equals allEmoji count', () => {
      const total = emojiByCategory.reduce(
        (sum, cat) => sum + cat.emoji.length,
        0,
      );
      expect(total).toBe(allEmoji.length);
    });
  });
});
