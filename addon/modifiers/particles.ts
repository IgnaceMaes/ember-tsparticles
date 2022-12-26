import Modifier, { NamedArgs, PositionalArgs } from 'ember-modifier';
import { Options, tsParticles } from 'tsparticles-engine';
import { loadFull } from 'tsparticles';

import { registerDestructor } from '@ember/destroyable';

interface ParticlesModifierSignature {
  Args: {
    Positional: [];
    Named: {
      options: Options;
    };
  };
}

export default class ParticlesModifier extends Modifier<ParticlesModifierSignature> {
  async modify(
    element: Element,
    _: PositionalArgs<ParticlesModifierSignature>,
    { options }: NamedArgs<ParticlesModifierSignature>
  ) {
    await loadFull(tsParticles);
    let particlesContainer = await tsParticles.load(element.id, options);

    registerDestructor(this, () => {
      particlesContainer?.destroy();
      particlesContainer = undefined;
    });
  }
}
