<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

#[ORM\Entity]
class Ability
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: Hero::class, inversedBy: 'abilities')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Hero $hero = null;

    #[ORM\Column(length: 100)]
    private string $name = '';

    #[ORM\Column(type: 'text')]
    private string $description = '';

    #[ORM\Column(nullable: true)]
    private ?int $cooldown = null;

    #[ORM\Column(nullable: true)]
    private ?string $iconUrl = null;

    #[ORM\OneToMany(mappedBy: 'ability', targetEntity: Upgrade::class, cascade: ['persist', 'remove'])]
    private Collection $upgrades;

    public function __construct()
    {
        $this->upgrades = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getHero(): ?Hero
    {
        return $this->hero;
    }

    public function setHero(?Hero $hero): self
    {
        $this->hero = $hero;
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

    public function getCooldown(): ?int
    {
        return $this->cooldown;
    }

    public function setCooldown(?int $cooldown): self
    {
        $this->cooldown = $cooldown;
        return $this;
    }

    public function getIconUrl(): ?string
    {
        return $this->iconUrl;
    }

    public function setIconUrl(?string $iconUrl): self
    {
        $this->iconUrl = $iconUrl;
        return $this;
    }

    /**
     * @return Collection<int, Upgrade>
     */
    public function getUpgrades(): Collection
    {
        return $this->upgrades;
    }

    public function addUpgrade(Upgrade $upgrade): self
    {
        if (!$this->upgrades->contains($upgrade)) {
            $this->upgrades->add($upgrade);
            $upgrade->setAbility($this);
        }

        return $this;
    }

    public function removeUpgrade(Upgrade $upgrade): self
    {
        if ($this->upgrades->removeElement($upgrade)) {
            if ($upgrade->getAbility() === $this) {
                $upgrade->setAbility(null);
            }
        }

        return $this;
    }
}
