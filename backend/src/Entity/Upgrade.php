<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

#[ORM\Entity]
class Upgrade
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: Ability::class, inversedBy: 'upgrades')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Ability $ability = null;

    #[ORM\Column(length: 100)]
    private string $name = '';

    #[ORM\Column(type: 'text')]
    private string $description = '';

    #[ORM\Column]
    private int $cost = 0;

    #[ORM\Column(type: 'json')]
    private array $effect = [];

    #[ORM\OneToMany(mappedBy: 'upgrade', targetEntity: BuildUpgrade::class, cascade: ['persist', 'remove'])]
    private Collection $buildUpgrades;

    public function __construct()
    {
        $this->buildUpgrades = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAbility(): ?Ability
    {
        return $this->ability;
    }

    public function setAbility(?Ability $ability): self
    {
        $this->ability = $ability;
        return $this;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;
        return $this;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;
        return $this;
    }

    public function getCost(): int
    {
        return $this->cost;
    }

    public function setCost(int $cost): self
    {
        $this->cost = $cost;
        return $this;
    }

    public function getEffect(): array
    {
        return $this->effect;
    }

    public function setEffect(array $effect): self
    {
        $this->effect = $effect;
        return $this;
    }

    /**
     * @return Collection<int, BuildUpgrade>
     */
    public function getBuildUpgrades(): Collection
    {
        return $this->buildUpgrades;
    }

    public function addBuildUpgrade(BuildUpgrade $buildUpgrade): self
    {
        if (!$this->buildUpgrades->contains($buildUpgrade)) {
            $this->buildUpgrades->add($buildUpgrade);
            $buildUpgrade->setUpgrade($this);
        }

        return $this;
    }

    public function removeBuildUpgrade(BuildUpgrade $buildUpgrade): self
    {
        if ($this->buildUpgrades->removeElement($buildUpgrade)) {
            if ($buildUpgrade->getUpgrade() === $this) {
                $buildUpgrade->setUpgrade(null);
            }
        }

        return $this;
    }
}
