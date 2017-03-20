import { ArrayFunctor, ArrayApplicative, ArrayMonad, Maybe, MaybeFunctor, MaybeApplicative, MaybeMonad } from '../monad';

const id = value => value;

describe('applicative laws', () => {

  // pure id <*> v = v
  it('should adhere to the identity law', () => {
    const v = "value";
    const pure = ArrayApplicative.pure;

    expect(pure(v).apply(pure(id))).toEqual(pure(v));
  });

  // pure id <*> v = v
  it('should adhere to the identity law', () => {
    const v = "value";
    const pure = MaybeApplicative.pure;

    expect(pure(v).apply(pure(id))).toEqual(pure(v));
  });

});
