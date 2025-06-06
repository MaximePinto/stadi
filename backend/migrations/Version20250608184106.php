<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250608184106 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE TABLE ability (id INT AUTO_INCREMENT NOT NULL, hero_id INT NOT NULL, name VARCHAR(100) NOT NULL, description LONGTEXT NOT NULL, cooldown INT DEFAULT NULL, icon_url VARCHAR(255) DEFAULT NULL, INDEX IDX_35CFEE3C45B0BCD (hero_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE build (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, hero_id INT NOT NULL, name VARCHAR(100) NOT NULL, description LONGTEXT NOT NULL, created_at DATETIME NOT NULL COMMENT '(DC2Type:datetime_immutable)', updated_at DATETIME NOT NULL COMMENT '(DC2Type:datetime_immutable)', is_public TINYINT(1) NOT NULL, INDEX IDX_BDA0F2DBA76ED395 (user_id), INDEX IDX_BDA0F2DB45B0BCD (hero_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE build_upgrade (id INT AUTO_INCREMENT NOT NULL, build_id INT NOT NULL, upgrade_id INT NOT NULL, slot INT NOT NULL, INDEX IDX_9AF3099617C13F8B (build_id), INDEX IDX_9AF3099698729BBE (upgrade_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE hero (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(100) NOT NULL, role VARCHAR(20) NOT NULL, description LONGTEXT NOT NULL, image_url VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE upgrade (id INT AUTO_INCREMENT NOT NULL, ability_id INT NOT NULL, name VARCHAR(100) NOT NULL, description LONGTEXT NOT NULL, cost INT NOT NULL, effect JSON NOT NULL COMMENT '(DC2Type:json)', INDEX IDX_B766741A8016D8B2 (ability_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE `user` (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL COMMENT '(DC2Type:json)', password VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE ability ADD CONSTRAINT FK_35CFEE3C45B0BCD FOREIGN KEY (hero_id) REFERENCES hero (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE build ADD CONSTRAINT FK_BDA0F2DBA76ED395 FOREIGN KEY (user_id) REFERENCES `user` (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE build ADD CONSTRAINT FK_BDA0F2DB45B0BCD FOREIGN KEY (hero_id) REFERENCES hero (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE build_upgrade ADD CONSTRAINT FK_9AF3099617C13F8B FOREIGN KEY (build_id) REFERENCES build (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE build_upgrade ADD CONSTRAINT FK_9AF3099698729BBE FOREIGN KEY (upgrade_id) REFERENCES upgrade (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE upgrade ADD CONSTRAINT FK_B766741A8016D8B2 FOREIGN KEY (ability_id) REFERENCES ability (id)
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE ability DROP FOREIGN KEY FK_35CFEE3C45B0BCD
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE build DROP FOREIGN KEY FK_BDA0F2DBA76ED395
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE build DROP FOREIGN KEY FK_BDA0F2DB45B0BCD
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE build_upgrade DROP FOREIGN KEY FK_9AF3099617C13F8B
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE build_upgrade DROP FOREIGN KEY FK_9AF3099698729BBE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE upgrade DROP FOREIGN KEY FK_B766741A8016D8B2
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE ability
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE build
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE build_upgrade
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE hero
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE upgrade
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE `user`
        SQL);
    }
}
