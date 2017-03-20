import { ArrayFunctor, ArrayApplicative, ArrayMonad, Maybe, MaybeFunctor, MaybeApplicative, MaybeMonad } from '../monad';

const id = value => value;

// (+1) . (*2) $ 1 = 3, so the left argument is applied second
const compose = a => b => v => a(b(v));
const $ = v => f => f(v);

const f = v => `f ${v}`;
const g = v => `g ${v}`;

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

    expect(v.fmap(compose(g)(f))).toEqual(v.fmap(f).fmap(g));
  });

  // fmap (g . f) = fmap g . fmap f
  it('should adhere to the identity law', () => {
    const v = new MaybeFunctor("value");

    expect(v.fmap(compose(g)(f))).toEqual(v.fmap(f).fmap(g));
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

  // pure f <*> pure x = pure (f x)
  it('should adhere to the homomorphism law', () => {
    const x = "value";
    const pure = ArrayApplicative.pure;

    expect(pure(x).apply(pure(f))).toEqual(pure(f(x)));
  });

  // pure f <*> pure x = pure (f x)
  it('should adhere to the homomorphism law', () => {
    const x = "value";
    const pure = MaybeApplicative.pure;

    expect(pure(x).apply(pure(f))).toEqual(pure(f(x)));
  });

  // u <*> pure y = pure ($ y) <*> u
  it('should adhere to the interchange law', () => {
    const y = "value";
    const pure = MaybeApplicative.pure;
    const u = pure(f);

    expect(pure(y).apply(u)).toEqual(u.apply(pure($(y))));
  });

  // u <*> pure y = pure ($ y) <*> u
  it('should adhere to the interchange law', () => {
    const y = "value";
    const pure = MaybeApplicative.pure;
    const u = pure(f);

    expect(pure(y).apply(u)).toEqual(u.apply(pure($(y))));
  });

  // pure (.) <*> u <*> v <*> w = u <*> (v <*> w)
  it('should adhere to the composition law', () => {
    const pure = ArrayApplicative.pure;
    const w = pure("value");
    const u = pure(f);
    const v = pure(g);

    expect(w.apply(v.apply(u.apply(pure(compose))))).toEqual(w.apply(v).apply(u));
  });

  // pure (.) <*> u <*> v <*> w = u <*> (v <*> w)
  it('should adhere to the composition law', () => {
    const pure = MaybeApplicative.pure;
    const w = pure("value");
    const u = pure(f);
    const v = pure(g);

    expect(w.apply(v.apply(u.apply(pure(compose))))).toEqual(w.apply(v).apply(u));
  });

});

describe('monad laws', () => {

  // return a >>= f = f a
  it('should adhere to the left unit law', () => {
    const _return = ArrayMonad.return;
    const a = "value";
    const mf = compose(_return)(f);

    expect(_return(a).bind(mf)).toEqual(mf(a));
  });

  // return a >>= f = f a
  it('should adhere to the left unit law', () => {
    const _return = MaybeMonad.return;
    const a = "value";
    const mf = compose(_return)(f);

    expect(_return(a).bind(mf)).toEqual(mf(a));
  });

  // m >>= return = m
  it('should adhere to the right unit law', () => {
    const _return = ArrayMonad.return;
    const m = _return("value");

    expect(m.bind(_return)).toEqual(m);
  });

  // m >>= return = m
  it('should adhere to the right unit law', () => {
    const _return = MaybeMonad.return;
    const m = _return("value");

    expect(m.bind(_return)).toEqual(m);
  });

  // (m >>= f) >>= g = m >>= (\x -> f x >>= g)
  it('should adhere to the associativity law', () => {
    const _return = ArrayMonad.return;
    const m = _return("value");
    const mf = compose(_return)(f);
    const mg = compose(_return)(g);

    expect(m.bind(mf).bind(mg)).toEqual(m.bind(v => mf(v).bind(mg)));
  });

  // (m >>= f) >>= g = m >>= (\x -> f x >>= g)
  it('should adhere to the associativity law', () => {
    const _return = MaybeMonad.return;
    const m = _return("value");
    const mf = compose(_return)(f);
    const mg = compose(_return)(g);

    expect(m.bind(mf).bind(mg)).toEqual(m.bind(v => mf(v).bind(mg)));
  });

});
