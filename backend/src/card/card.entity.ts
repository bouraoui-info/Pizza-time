import { timeStamp } from "console";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Item, SupplimentComposition, categories, horaire, shoplist, villelivraison } from "./card.interface";

@Entity('card')
export class cardEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ default: "" })
    title: string;

    @Column({ type: 'jsonb' })
    items: Item[];

    @Column({ type: 'jsonb' })
    SupplimentComposition: SupplimentComposition[];

    @Column({ type: 'jsonb' })
    shoplist: shoplist[];

    @Column({ type: 'jsonb' })
    categories: categories[];

    @Column({ default: "" })
    town: string;

    @Column({ default: "" })
    image: string;

    @Column({ default: "" })
    Nature: string;

    @Column({})
    shopid: number;

    @Column({ default: "" })
    Address: string;

    @Column({ default: "" })
    Company: string;

    @Column({ default: "" })
    Country: string;

    @Column({ default: "" })
    PostalCode: string;

    @Column({ type: 'float', default: 0.000000 })
    latitude: number;

    @Column({ type: 'float', default: 0.000000 })
    longitude: number;

    @Column({ default: "" })
    tel: string;

    @Column({ type: 'jsonb' })
    villelivraison: villelivraison;

    @Column({ type: 'jsonb' })
    horaire: horaire;

    @Column({ default: "" })
    Responsible: string;

    @Column({ default: "" })
    etat: string;
    

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

}
