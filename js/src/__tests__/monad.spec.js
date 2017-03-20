import { ArrayFunctor, ArrayApplicative, ArrayMonad, Maybe, MaybeFunctor, MaybeApplicative, MaybeMonad } from '../monad';

const id = value => value;
const f = v => `f ${v}`;
const g = v => `g ${v}`;
const compose = (a, b) => v => b(a(v));

describe('functor laws', () => {

  // fmap id = id
  it('should adhere to the identity law', () => {
    const v = new ArrayFunctor("value");

    expect(v.fmap(id)).toEqual(v);
  });

  // fmap id = id
  it('should adhere to the identity law', () => {
    const v = new MaybeFunctor("value");

    expect(v.fmap(id)).toEqual(v);
  });

  // fmap (g . f) = fmap g . fmap f
  it('should adhere to the identity law', () => {
    const v = new ArrayFunctor("value");

    expect(v.fmap(compose(g, f))).toEqual(v.fmap(g).fmap(f));
  });

  // fmap (g . f) = fmap g . fmap f
  it('should adhere to the identity law', () => {
    const v = new MaybeFunctor("value");

    expect(v.fmap(compose(g, f))).toEqual(v.fmap(g).fmap(f));
  });

});

describe('applicative laws', () => {

  // pure id <*> v = v
  it('should adhere to the identity law', () => {
    const pure = ArrayApplicative.pure;
    const v = pure("value");

    expect(v.apply(pure(id))).toEqual(v);
  });

  // pure id <*> v = v
  it('should adhere to the identity law', () => {
    const pure = MaybeApplicative.pure;
    const v = pure("value");

    expect(v.apply(pure(id))).toEqual(v);
  });

});
